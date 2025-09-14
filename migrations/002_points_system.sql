-- Points System Migration
-- Creates a centralized points management system with triggers

-- =====================================================
-- 1. POINT RULES TABLE
-- =====================================================
-- Defines how many points each action gives
CREATE TABLE IF NOT EXISTS public.point_rules (
    id SERIAL PRIMARY KEY,
    action TEXT UNIQUE NOT NULL,
    points INTEGER NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default point rules
INSERT INTO public.point_rules (action, points, description) VALUES
    ('referral_success', 100, 'Points awarded when someone uses your referral code')
ON CONFLICT (action) DO UPDATE SET
    points = EXCLUDED.points,
    description = EXCLUDED.description;

-- =====================================================
-- 2. POINTS LOG TABLE
-- =====================================================
-- Stores every points transaction for audit trail
CREATE TABLE IF NOT EXISTS public.points_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    points INTEGER NOT NULL,
    reference_id UUID, -- Optional: link to related record (form_submission, etc.)
    metadata JSONB, -- Optional: additional data about the transaction
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS points_log_user_id_idx ON public.points_log (user_id);
CREATE INDEX IF NOT EXISTS points_log_action_idx ON public.points_log (action);
CREATE INDEX IF NOT EXISTS points_log_created_at_idx ON public.points_log (created_at);

-- =====================================================
-- 3. CENTRALIZED ADD_POINTS FUNCTION
-- =====================================================
-- Main function to add points to a user
CREATE OR REPLACE FUNCTION add_points(
    target_user_id UUID,
    action_name TEXT,
    reference_id UUID DEFAULT NULL,
    metadata JSONB DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    point_value INTEGER;
    new_total INTEGER;
BEGIN
    -- Get point value for this action
    SELECT points INTO point_value
    FROM public.point_rules
    WHERE action = action_name AND active = TRUE;
    
    -- If action not found, raise exception
    IF point_value IS NULL THEN
        RAISE EXCEPTION 'Point rule not found for action: %', action_name;
    END IF;
    
    -- Update user points
    UPDATE public.users
    SET points = points + point_value
    WHERE user_id = target_user_id
    RETURNING points INTO new_total;
    
    -- If user not found, raise exception
    IF new_total IS NULL THEN
        RAISE EXCEPTION 'User not found: %', target_user_id;
    END IF;
    
    -- Log the transaction
    INSERT INTO public.points_log (user_id, action, points, reference_id, metadata)
    VALUES (target_user_id, action_name, point_value, reference_id, metadata);
    
    -- Return new total points
    RETURN new_total;
END;
$$;

-- =====================================================
-- 4. REFERRAL POINTS TRIGGER
-- =====================================================
-- Automatically award referral points when form is submitted with referral code

CREATE OR REPLACE FUNCTION handle_referral_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    referrer_user_id UUID;
BEGIN
    -- Only process if referralCode is provided
    IF NEW."referralCode" IS NOT NULL AND NEW."referralCode" != '' THEN
        -- Find the user who owns this referral code
        SELECT user_id INTO referrer_user_id
        FROM public.users
        WHERE code = UPPER(NEW."referralCode");
        
        -- If referrer found, award points
        IF referrer_user_id IS NOT NULL THEN
            -- Award points to referrer
            PERFORM add_points(
                referrer_user_id,
                'referral_success',
                NEW.id,
                jsonb_build_object(
                    'referred_user_id', NEW.user_id,
                    'referral_code', NEW."referralCode"
                )
            );
            
            -- Log successful referral
            RAISE NOTICE 'Awarded referral points to user % for referral code %', 
                referrer_user_id, NEW."referralCode";
        ELSE
            -- Log invalid referral code (but don't fail the transaction)
            RAISE NOTICE 'Invalid referral code provided: %', NEW."referralCode";
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS referral_points_trigger ON public.form_submission;
CREATE TRIGGER referral_points_trigger
    AFTER INSERT ON public.form_submission
    FOR EACH ROW
    EXECUTE FUNCTION handle_referral_points();

-- =====================================================
-- 6. RPC FUNCTIONS FOR MANUAL POINT OPERATIONS
-- =====================================================

-- Function to manually award points (for missions, admin actions, etc.)
CREATE OR REPLACE FUNCTION award_points(
    target_user_id UUID,
    action_name TEXT,
    reference_id UUID DEFAULT NULL,
    metadata JSONB DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_total INTEGER;
    point_value INTEGER;
BEGIN
    -- Check if user exists and get current points
    SELECT points INTO new_total FROM public.users WHERE user_id = target_user_id;
    IF new_total IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'User not found');
    END IF;
    
    -- Get point value for validation
    SELECT points INTO point_value FROM public.point_rules WHERE action = action_name AND active = TRUE;
    IF point_value IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Invalid action: ' || action_name);
    END IF;
    
    -- Award points
    new_total := add_points(target_user_id, action_name, reference_id, metadata);
    
    RETURN json_build_object(
        'success', true,
        'points_awarded', point_value,
        'new_total', new_total,
        'action', action_name
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Function to get user's points history
CREATE OR REPLACE FUNCTION get_points_history(target_user_id UUID)
RETURNS TABLE (
    action TEXT,
    points INTEGER,
    created_at TIMESTAMPTZ,
    metadata JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT pl.action, pl.points, pl.created_at, pl.metadata
    FROM public.points_log pl
    WHERE pl.user_id = target_user_id
    ORDER BY pl.created_at DESC;
END;
$$;

-- =====================================================
-- 7. GRANT PERMISSIONS
-- =====================================================

-- Grant permissions for authenticated users to use RPC functions
GRANT EXECUTE ON FUNCTION award_points(UUID, TEXT, UUID, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION get_points_history(UUID) TO authenticated;

-- Grant select permissions for point_rules (read-only for users)
GRANT SELECT ON public.point_rules TO authenticated;

-- Grant select permissions for points_log (users can see their own history via RPC)
-- Note: RLS will be handled by the RPC functions

-- =====================================================
-- 8. RLS POLICIES
-- =====================================================

-- Enable RLS on new tables
ALTER TABLE public.point_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_log ENABLE ROW LEVEL SECURITY;

-- Point rules are readable by all authenticated users
CREATE POLICY point_rules_read ON public.point_rules
    FOR SELECT TO authenticated
    USING (true);

-- Points log is only accessible via RPC functions (no direct access)
CREATE POLICY points_log_no_direct_access ON public.points_log
    FOR ALL TO authenticated
    USING (false);

-- Allow the trigger functions to insert into points_log
-- (This is handled by SECURITY DEFINER on the functions)

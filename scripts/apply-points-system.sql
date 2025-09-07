-- Apply Points System Migrations
-- Run this script in your Supabase SQL Editor

-- Migration 1: Points System
\i migrations/002_points_system.sql

-- Migration 2: Schema Consistency Fix  
\i migrations/003_fix_schema_consistency.sql

-- Verify the setup
SELECT 'Points system installed successfully!' as status;

-- Show available point rules
SELECT action, points, description FROM point_rules WHERE active = true ORDER BY action;

-- Show table structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('point_rules', 'points_log', 'users')
    AND table_schema = 'public'
ORDER BY table_name, ordinal_position;

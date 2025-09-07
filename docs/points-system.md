# Points System Documentation

## Overview

The points system uses database triggers and centralized functions to automatically award points for user actions, avoiding RLS complications and ensuring consistency.

## Database Schema

### Tables

#### `point_rules`

Defines how many points each action awards:

```sql
- id: SERIAL PRIMARY KEY
- action: TEXT UNIQUE (e.g., 'referral_success', 'form_submission')
- points: INTEGER (point value)
- description: TEXT
- active: BOOLEAN
- created_at: TIMESTAMPTZ
```

#### `points_log`

Audit trail of all point transactions:

```sql
- id: UUID PRIMARY KEY
- user_id: UUID (references auth.users)
- action: TEXT (action name)
- points: INTEGER (points awarded)
- reference_id: UUID (optional link to related record)
- metadata: JSONB (additional data)
- created_at: TIMESTAMPTZ
```

## Core Functions

### `add_points(user_id, action, reference_id?, metadata?)`

Centralized function to award points:

-   Looks up point value from `point_rules`
-   Updates `users.points`
-   Logs transaction in `points_log`
-   Returns new total points

### `award_points()` - RPC Function

Manual point award function for admin/mission use:

```sql
SELECT award_points(
    'user-uuid',
    'mission_complete',
    'mission-id',
    '{"mission_name": "Daily Login"}'::jsonb
);
```

### `get_points_history()` - RPC Function

Get user's point transaction history:

```sql
SELECT * FROM get_points_history('user-uuid');
```

## Automatic Triggers

### Referral Points Trigger

**When**: Form submission with `referralCode`
**Action**: Awards points to the referrer
**Points**: 100 (configurable in `point_rules`)

### Submission Points Trigger

**When**: Form submission completed
**Action**: Awards points to the submitter
**Points**: 50 (configurable in `point_rules`)

## Default Point Values

| Action             | Points | Description                          |
| ------------------ | ------ | ------------------------------------ |
| `referral_success` | 100    | When someone uses your referral code |
| `form_submission`  | 50     | For completing registration          |
| `mission_complete` | 25     | For completing missions              |

## Usage Examples

### 1. Automatic Referral Points

```javascript
// When form is submitted with referralCode, triggers automatically award:
// - 50 points to the submitter (form_submission)
// - 100 points to the referrer (referral_success)
```

### 2. Manual Mission Points

```javascript
// Award points for completing a mission
const result = await supabase.rpc("award_points", {
    target_user_id: "user-uuid",
    action_name: "mission_complete",
    reference_id: "mission-uuid",
    metadata: { mission_name: "Daily Login" },
});
```

### 3. View Point History

```javascript
// Get user's point transaction history
const { data } = await supabase.rpc("get_points_history", {
    target_user_id: "user-uuid",
});
```

## Migration Files

1. **`002_points_system.sql`** - Creates the complete points system
2. **`003_fix_schema_consistency.sql`** - Fixes column naming inconsistencies

## Benefits

✅ **Automatic**: Points awarded via triggers, no manual code needed
✅ **Consistent**: Centralized logic prevents duplicates or missed awards
✅ **Auditable**: Complete transaction history in `points_log`
✅ **Flexible**: Easy to add new point rules or modify existing ones
✅ **Secure**: No RLS bypass needed, uses SECURITY DEFINER functions
✅ **Reliable**: Database-level constraints ensure data integrity

## Security

-   All functions use `SECURITY DEFINER` to bypass RLS when needed
-   Users can only see their own point history via RPC functions
-   Direct table access is restricted by RLS policies
-   Point rules are read-only for regular users

## Adding New Point Actions

1. Insert new rule into `point_rules` table:

```sql
INSERT INTO point_rules (action, points, description)
VALUES ('daily_login', 10, 'Points for daily login');
```

2. Use in code:

```javascript
await supabase.rpc("award_points", {
    target_user_id: userId,
    action_name: "daily_login",
});
```

## Troubleshooting

### Check Point Rules

```sql
SELECT * FROM point_rules WHERE active = true;
```

### View Recent Transactions

```sql
SELECT * FROM points_log ORDER BY created_at DESC LIMIT 10;
```

### Check User Points

```sql
SELECT user_id, points FROM users WHERE user_id = 'user-uuid';
```

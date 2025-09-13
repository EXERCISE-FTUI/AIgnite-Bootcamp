# IKM Expo Points Campaign PRD

## 1. Introduction / Overview

The **IKM Expo Points Campaign** is a limited-time promotion to encourage visitors of the offline _IKM Expo_ event to register and complete the Exercise Open Recruitment form.

• Visitors scan a static QR code at the event.
• Scanning flags their account as an _IKM Expo_ participant (`isFromIKMExpo = true`).
• If they complete the form submission **by Friday 19 September 2025 23:59 WIB**, they are automatically awarded **100 points**.
• Non-Expo users receive **0 points** for form submission during this campaign.

The campaign also adds subtle UI cues for flagged users and handles both successful and expired redemption flows.

## 2. Goals

1. Increase conversion of Expo visitors into completed applications.
2. Award exactly 100 points to eligible users after timely submission.
3. Provide clear UX feedback for successful and failed redemptions.
4. Prevent point abuse after campaign expiry.

## 3. User Stories

1. **As an Expo attendee**, I can scan a QR code and, after logging in, see a confirmation that I’ve claimed the Expo bonus so that I know I will get extra points if I submit the form in time.
2. **As an Expo attendee who has claimed the bonus**, when I complete my form before the deadline, I automatically receive 100 points so that I feel rewarded for attending the Expo.
3. **As an Expo attendee scanning the QR after the deadline**, I am shown an expiry page so that I understand the promotion is over.
4. **As a regular user (non-Expo)**, submitting the form gives 0 points so that only Expo visitors are rewarded.

## 4. Functional Requirements

### 4.1 Backend

1. **QR Claim Endpoint**  
   1.1 Route: `POST /api/ikm-expo/claim`  
   1.2 Auth: Requires Supabase session. If unauthenticated, respond with `401` and client should redirect to login (with return-to parameter).  
   1.3 Logic: Sets `isFromIKMExpo = true` on `public.users` for the current user. Idempotent: multiple calls have no side-effects after the first.  
   1.4 Reject if current timestamp ≥ `2025-09-19 23:59:59 +07` (WIB). Return `{ success:false, reason:"expired" }`.

2. **Form-Submission Bonus Update**  
   2.1 In the existing form submission endpoint (or trigger), when inserting a new `form_submission` row:  
   • If `users.isFromIKMExpo = true` **and** `NOW()` < campaign deadline, call `add_points(target_user_id,'ikm_expo_bonus')` with a hard-coded value of 100 points (do _not_ read `point_rules`).  
   • Otherwise grant 0 points.  
   2.2 Ensure this runs **once** per user (submission table already `UNIQUE (user_id)` so second insert path is blocked).

3. **Deadline Enforcement**  
   • No points are awarded and QR claim fails on/after `2025-09-20 00:00 +07`.

### 4.2 Frontend / UI

4. **QR Landing Page** `/ikm-expo` (server component)  
   • On load, calls `/api/ikm-expo/claim`.  
   • Success → redirect to `/ikm-expo/success`.  
   • Failure with `expired` → redirect to `/ikm-expo/expired`.  
   • Failure unauthenticated → redirect to `/auth/login?returnTo=/ikm-expo`.

5. **Success Page** `/ikm-expo/success`  
   • Message: “You’ve successfully claimed your Expo bonus! Complete your submission before 19 Sep 2025 23:59 WIB to receive 100 points.”  
   • CTA button → `/upload`.

6. **Expired Page** `/ikm-expo/expired`  
   • Message: “Sorry, this promotion has ended.”  
   • Link → `/` home.

7. **Dashboard Notice** (non-registered dashboard)  
   • If `isFromIKMExpo` and no `form_submission` yet, show a small banner **below** the _Fill Form_ button: “Expo attendee bonus: Submit before 19 Sep 2025 to receive 100 pts”.

8. **Upload Page Notice** `/upload`  
   • If `isFromIKMExpo`, show text **below** the _Next / Submit_ button with same copy as above.

### 4.3 Authentication Flow Adjustments

9. Login page accepts `returnTo` query param. After successful login, redirect back to that path so QR scans from logged-out users complete automatically.

## 5. Non-Goals

• No changes to `point_rules` table.  
• No analytics or detailed logging beyond existing infra.  
• Users cannot delete submissions; thus no re-award handling.  
• No mobile deep-linking or QR generation logic (QR is static URL only).

## 6. Design Considerations

• Re-use existing color palette & typography.  
• Banner should be unobtrusive: small font, brand accent color background, rounded corners.  
• Success / expired pages can reuse existing _global_ layout components.

## 7. Technical Considerations

• `users` table RLS only allows self-updates; the claim endpoint must execute under the authenticated user and update their own row.  
• For expiry check in SQL, use `AT TIME ZONE 'Asia/Jakarta'`.  
• Consider creating an SQL `ikm_expo_bonus` action enum in `point_rules` later, but hard-code 100 for now.

## 8. Success Metrics

• ≥30 % of QR scanners complete submission before deadline.  
• ≥95 % of eligible submissions receive correct 100-point bonus (no duplicates, no misses).

## 9. Open Questions

1. Copywriting / translation: final Indonesian vs. English text?
2. Do we need admin visibility/report of how many bonuses awarded?
3. Should the banner disappear after submission or remain (showing points awarded)?

## Implementation

### Relevant Files

-   `src/app/api/ikm-expo/claim/route.ts` – New API route to flag user as IKM Expo participant.
-   `src/app/api/submit/route.js` – Existing form-submission route; add logic to award 100-pt bonus.
-   `migrations/004_ikm_expo_bonus_trigger.sql` – (Optional) Future SQL trigger alternative.
-   `src/app/ikm-expo/page.tsx` – Landing page that calls the claim API.
-   `src/app/ikm-expo/success/page.tsx` – Success confirmation page.
-   `src/app/ikm-expo/expired/page.tsx` – Expired campaign page.
-   `src/app/auth/login/page.tsx` – Add `returnTo` handling.
-   `src/components/dashboard/not-registered-dashboard.tsx` – Show Expo banner below Fill Form button.
-   `src/app/dashboard/upload/page.tsx` – Show Expo banner below Next/Submit button.
-   `tests/ikm-expo/claim.spec.ts` – Integration tests for claim endpoint.
-   `tests/ikm-expo/submission-bonus.spec.ts` – Integration tests for bonus logic.

#### Notes

-   Use test accounts `test1@gmail.com`, `test2@gmail.com`, etc., in Supabase auth for automated tests.
-   Deadline constant: `const CAMPAIGN_DEADLINE = new Date('2025-09-19T16:59:59Z'); // 23:59 WIB`.
-   Ensure claim endpoint is idempotent (`update ... set isFromIKMExpo = true where ...`).
-   Banner components should reuse existing Tailwind classes to remain unobtrusive.
-   For unit tests, mock Supabase client and system time (use `vitest.useFakeTimers()`).
-   Manual QA checklist: scan QR logged-in, logged-out, after deadline, repeat scan, bonus awarded.

### Tasks

-   [ ] 1.0 Backend: QR Claim Endpoint to set `isFromIKMExpo`

    -   [ ] 1.1 Create `src/app/api/ikm-expo/claim/route.ts` with `POST` handler.
    -   [ ] 1.2 Fetch Supabase session; if none, return 401.
    -   [ ] 1.3 Compare `NOW()` vs `CAMPAIGN_DEADLINE`; return `{ success:false, reason:'expired' }` when expired.
    -   [ ] 1.4 Update current user row `isFromIKMExpo = true` (idempotent) via Supabase client RPC.
    -   [ ] 1.5 Return `{ success:true }` JSON response.
    -   [ ] 1.6 Add integration test `tests/ikm-expo/claim.spec.ts` covering success, unauthenticated, expired.

-   [ ] 2.0 Backend: Award 100-point bonus during form submission

    -   [ ] 2.1 In `src/app/api/submit/route.js`, after successful DB insert, fetch user record.
    -   [ ] 2.2 If `isFromIKMExpo && now < CAMPAIGN_DEADLINE`, call `add_points` RPC with hard-coded 100.
    -   [ ] 2.3 Ensure logic skips for non-Expo users.
    -   [ ] 2.4 Add integration test `tests/ikm-expo/submission-bonus.spec.ts` validating single award and 0 pts for others.

-   [ ] 3.0 Frontend: QR landing, success, and expired pages

    -   [ ] 3.1 Create `/ikm-expo/page.tsx` that triggers claim API in `useEffect` and handles redirects.
    -   [ ] 3.2 Build `/ikm-expo/success/page.tsx` with copy and CTA to `/upload`.
    -   [ ] 3.3 Build `/ikm-expo/expired/page.tsx` with expiry message.
    -   [ ] 3.4 Add simple unit tests verifying rendered messages.

-   [ ] 4.0 Frontend: Login `returnTo` parameter handling

    -   [ ] 4.1 Update `src/app/auth/login/page.tsx` to read `returnTo` query and pass along after auth.
    -   [ ] 4.2 Modify post-login logic (hook or callback) to `router.push(returnTo ?? '/dashboard')`.
    -   [ ] 4.3 Write Cypress flow test: scan link → login → auto-redirect completes claim.

-   [ ] 5.0 Frontend: Expo bonus notices on dashboard and upload pages

    -   [ ] 5.1 In `not-registered-dashboard.tsx`, when `session.user.isFromIKMExpo`, render banner below Fill Form button.
    -   [ ] 5.2 In `/dashboard/upload/page.tsx`, render banner below Next/Submit when same condition.
    -   [ ] 5.3 Add unit tests to ensure visibility toggles based on flag.

-   [ ] 6.0 Testing & QA [MANUAL, NO LLM]

    -   [ ] 6.1 Login as test1@gmail.com, test2@gmail.com, etc.
    -   [ ] 6.2 Scan QR code, should redirect to success page.
    -   [ ] 6.3 Complete form, should award 100 points.
    -   [ ] 6.5 Login as non-Expo user, submit form, should not award points.
    -   [ ] 6.6 Set the deadline to past date, scan QR code, should redirect to expired page.

-   [ ] 7.0 Create PR [MANUAL, NO LLM]
    -   [ ] 7.1 Create PR with title "add ikm expo points campaign"
    -   [ ] 7.2 Assign @Tianrider as reviewer
    -   [ ] 7.3 Include all the test result from 6.1 to 6.6 in the PRD, include screenshots.
    -   [ ] 7.4 Wait for review

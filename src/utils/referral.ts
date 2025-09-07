// Simple referral code management

const REFERRAL_KEY = "referralCode";

export function storeReferralCode(code: string): void {
    if (typeof window !== "undefined" && code) {
        localStorage.setItem(REFERRAL_KEY, code.toUpperCase());
    }
}

export function getReferralCode(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem(REFERRAL_KEY);
    }
    return null;
}

export function clearReferralCode(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(REFERRAL_KEY);
    }
}

export function captureReferralFromUrl(): void {
    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const referral = params.get("referral");
        if (referral) {
            storeReferralCode(referral);
            console.log("Captured referral code:", referral);
        }
    }
}

"use client";

import { useEffect } from "react";
import { captureReferralFromUrl } from "@/utils/referral";

export default function ReferralCapture() {
    useEffect(() => {
        // Capture referral code from URL on page load
        captureReferralFromUrl();
    }, []);

    return null; // This component doesn't render anything
}

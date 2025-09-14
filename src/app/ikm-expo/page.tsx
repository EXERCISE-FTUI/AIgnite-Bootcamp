import { redirect } from "next/navigation";

export default async function IkmExpoPage() {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://bootcamp.exerciseftui.com";
    const res = await fetch(`${baseUrl}/api/ikm-expo/claim`, {
        method: "POST",
    });
    console.log("res", res);
    const result = await res.json();
    if (result.success) {
        redirect("/ikm-expo/success");
    } else if (result.reason === "expired") {
        redirect("/ikm-expo/expired");
    } else if (result.reason === "unauthenticated") {
        redirect("/auth/login?returnTo=/ikm-expo");
    } else {
        redirect("/");
    }
}

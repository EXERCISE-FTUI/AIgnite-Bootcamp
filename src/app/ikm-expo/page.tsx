import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IkmExpoPage() {
  const router = useRouter();

  useEffect(() => {
    async function claimBonus() {
      const res = await fetch("/api/ikm-expo/claim", { method: "POST" });
      const result = await res.json();
      if (result.success) {
        router.replace("/ikm-expo/success");
      } else if (result.reason === "expired") {
        router.replace("/ikm-expo/expired");
      } else if (result.reason === "unauthenticated") {
        router.replace("/auth/login?returnTo=/ikm-expo");
      }
    }
    claimBonus();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="text-lg">Processing your Expo claim...</span>
    </div>
  );
}

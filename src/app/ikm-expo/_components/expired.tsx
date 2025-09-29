"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function IkmExpoExpiredPage() {
    const router = useRouter();

    function handleGoToHome() {
        router.push("/dashboard");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen px-8 text-center">
            <h1 className="text-2xl font-bold mb-4">
                Sorry, this campaign has ended.
            </h1>
            <Button
                className="px-4 py-2 bg-purple_4 hover:bg-purple_3 text-white rounded"
                onClick={handleGoToHome}
            >
                Go to Dashboard
            </Button>
        </div>
    );
}

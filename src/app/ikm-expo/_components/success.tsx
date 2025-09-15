"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function IkmExpoSuccessPage() {
    const router = useRouter();

    function handleGoToUpload() {
        router.push("/dashboard");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen px-8 text-center">
            <h1 className="text-2xl font-bold mb-4">
                You’ve successfully claimed your campaign bonus!
            </h1>
            <p className="mb-6">
                Complete your form submission before{" "}
                <b>Friday, 19 Sep 2025 23:59 WIB</b> to receive 100 points.
            </p>
            <Button
                className="px-4 py-2 bg-purple_4 hover:bg-purple_3 text-white rounded"
                onClick={handleGoToUpload}
            >
                Go to Upload
            </Button>
        </div>
    );
}

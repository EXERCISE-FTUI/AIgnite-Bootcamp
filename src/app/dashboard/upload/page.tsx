import { createClient } from "@/utils/supabase/server";
import RegistrationForm from "./_components/registration-form";
import { redirect } from "next/navigation";
import { campaignIKMExpoDeadline } from "@/utils/information";

export default async function FormSubmissionWithUpload() {
    const supabase = createClient();
    const { data: user } = await (await supabase).auth.getUser();
    const email = user?.user?.email;
    let isFromIKMExpo = false;
    if (user?.user?.id) {
        const { data: userRecord } = await (await supabase)
            .from("users")
            .select("isFromIKMExpo")
            .eq("user_id", user.user.id)
            .single();
        isFromIKMExpo = !!userRecord?.isFromIKMExpo;
    }
    if (!email) {
        redirect("/");
    }
    return (
        <div className="mt-32">
            {isFromIKMExpo &&
                Date.now() < new Date(campaignIKMExpoDeadline).getTime() && (
                    <div className="w-full max-w-3xl mx-auto lg:px-4 px-8">
                        <div className="mt-4 px-4 py-2 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                            IKM Expo attendee bonus: Submit before{" "}
                            <b>19 Sep 2025</b> to receive <b>100 pts</b> bonus!
                        </div>
                    </div>
                )}
            <RegistrationForm email={email} />
        </div>
    );
}

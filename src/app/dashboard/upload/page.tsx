import { createClient } from "@/utils/supabase/server";
import RegistrationForm from "./_components/registration-form";
import { redirect } from "next/navigation";

export default async function FormSubmissionWithUpload() {
    const supabase = createClient();
    const { data: user } = await (await supabase).auth.getUser();
    const email = user?.user?.email;
    let isFromIKMExpo = false;
    if (user?.user?.id) {
        const { data: userRecord } = await (await supabase)
            .from('users')
            .select('isFromIKMExpo')
            .eq('id', user.user.id)
            .single();
        isFromIKMExpo = !!userRecord?.isFromIKMExpo;
    }
    if (!email) {
        redirect("/");
    }
    return (
        <div className="mt-32">
            <RegistrationForm email={email} />
            {isFromIKMExpo && (
                <div className="mt-4 px-4 py-2 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                    Expo attendee bonus: Submit before 19 Sep 2025 to receive 100 pts
                </div>
            )}
        </div>
    );
}

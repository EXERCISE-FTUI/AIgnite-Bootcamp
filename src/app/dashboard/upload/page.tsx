import { createClient } from "@/utils/supabase/server";
import RegistrationForm from "./_components/registration-form";
import { redirect } from "next/navigation";

export default async function FormSubmissionWithUpload() {
    const supabase = createClient();
    const { data: user } = await (await supabase).auth.getUser();
    const email = user?.user?.email;

    if (!email) {
        redirect("/");
    }

    return (
        <div className="mt-32">
            <RegistrationForm email={email} />
        </div>
    );
}

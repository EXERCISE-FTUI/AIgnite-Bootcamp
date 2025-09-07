"use client";
import RegistrationForm from "./_components/registration-form";
import { useForm } from "react-hook-form";

export default function FormSubmissionWithUpload() {
    console.log("FormSubmissionWithUpload");
    const form = useForm({
        defaultValues: {
            user_id: "",
            // Data diri
            firstName: "",
            lastName: "",
            email: "",
            noTelp: "",
            idLine: "",
            department: "",
            major: "",
            npm: "",
            selectedPath: "",
            // Upload dokumen
            cvAtsUrl: "",
            essayMotletUrl: "",
            twibbonUrl: "",
        },
    });

    const { handleSubmit, control } = form;

    const onSubmit = () => {
        // setIsLoading(true);
        // handleNext();
    };

    return (
        <div className="lg:mt-24">
            <RegistrationForm
                form={form}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                control={control}
                email=""
            />
        </div>
    );
}

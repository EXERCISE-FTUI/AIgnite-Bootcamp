"use client";

import React from "react";
import RegistrationForm from "./_components/registration-form";
import { useForm } from "react-hook-form";

type FormProps = {
    email: string;
};

const FormSubmissionWithUpload: React.FC<FormProps> = ({ email }) => {
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
        <>
            <div className="lg:mt-24">
                <RegistrationForm
                    form={form}
                    onSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                    control={control}
                    email={email}
                />
            </div>
        </>
    );
};

export default FormSubmissionWithUpload;

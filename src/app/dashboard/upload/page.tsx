"use client";

import React from "react";
import RegistrationForm from "./_components/registration-form";
import {useForm} from "react-hook-form";

type FormProps = {
	email: string;
};

const FormSubmissionWithUpload: React.FC<FormProps> = ({email}) => {
	const form = useForm({
		defaultValues: {
			user_id: "",
			fullName: "",
			npm: "",
			department: "",
			major: "",
			force: "",
			email: "",
			phone: "",
			idLine: "",
			otherContacts: "",
			division1: "",
			division2: "",
			folderUrl: "",
			cvUrl: "",
			motivationLetterUrl: "",
			assignment1Url: "",
			assignment2Url: "",
			instagramStoryUrl: "",
			twibbonUrl: "",
		},
	});

	const {handleSubmit, control} = form;

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

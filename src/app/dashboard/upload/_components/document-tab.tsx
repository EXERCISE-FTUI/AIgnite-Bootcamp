"use client";

import * as React from "react";
import {useCallback, useState} from "react";

import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {File, Trash, Upload} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import type {FormData} from "./registration-form";
import {useRouter} from "next/navigation";

interface FileUploadProps {
	label: string;
	note?: string;
	acceptedFormats: string;
	maxSize: number;
	onChange: (file: File | string | null) => void;
	file: File | string | null; // Add the `file` prop to display the link or file
}

function FileUpload({
	label,
	note,
	acceptedFormats,
	maxSize,
	onChange,
	file,
}: FileUploadProps) {
	const [dragActive, setDragActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFile = useCallback(
		(file: File) => {
			if (!file.type.includes("pdf") && !file.type.includes("image")) {
				setError("Please upload a PDF file");
				return;
			}
			if (file.size > maxSize * 1024 * 1024) {
				setError(`File size must be less than ${maxSize}MB`);
				return;
			}
			onChange(file);
			setError(null);
		},
		[maxSize, onChange]
	);

	const handleDrag = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setDragActive(false);
			if (e.dataTransfer.files && e.dataTransfer.files[0]) {
				handleFile(e.dataTransfer.files[0]);
			}
		},
		[handleFile]
	);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			if (e.target.files && e.target.files[0]) {
				handleFile(e.target.files[0]);
			}
		},
		[handleFile]
	);

	return (
		<div className="flex flex-col justify-end space-y-2">
			<Label className="font-semibold">{label}</Label>
			{note && <p className="text-sm text-muted-foreground">{note}</p>}
			<div className="bg-white border border-blue_4 rounded-lg p-3">
				<Card
					className={`max-h-32 overflow-hidden relative border-2 border-dashed rounded-lg p-3 ${
						dragActive
							? "border-[#584B7C] bg-[#584B7C]/5"
							: "border-gray-300"
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				>
					<input
						type="file"
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						accept={acceptedFormats}
						onChange={handleChange}
						maxLength={maxSize * 1024 * 1024}
					/>
					<div className="flex overflow-hidden flex-col items-center justify-center gap-2 py-4">
						{file ? (
							typeof file === "string" ? (
								// Display link if file is a string (URL)
								<>
									<File className="h-8 w-8 text-gray-500" />
									<div className="flex items-center gap-3 justify-center">
										<a
											href={file}
											className="text-blue-500 font-normal hover:underline text-sm z-[100]"
											target="_blank"
											rel="noopener noreferrer"
										>
											Show File
										</a>
									</div>
									<Trash
										className="h-4 w-4 absolute top-3 right-3 hover:text-black text-gray-500 cursor-pointer z-[100]"
										onClick={() => onChange(null)}
									/>
								</>
							) : (
								// Loading State
								<>
									{/* loading animation spinner */}
									<div role="status">
										<svg
											aria-hidden="true"
											className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple_4"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
										<span className="sr-only">
											Loading
											<span className="animate-[dot_1s_ease-in-out_infinite] inline-block">
												.
											</span>
											<span className="animate-[dot_1s_ease-in-out_0.2s_infinite] inline-block">
												.
											</span>
											<span className="animate-[dot_1s_ease-in-out_0.4s_infinite] inline-block">
												.
											</span>
										</span>
									</div>
									<div className="text-center overflow-hidden text-sm text-blue3 font-semibold">
										Uploading {file.name}...
									</div>
								</>
							)
						) : (
							// // Display default message when no file is selected
							<>
								<Upload className="h-8 w-8 text-gray-500" />
								<p className="text-sm text-gray-600">
									Drag and drop file or{" "}
									<span className="underline text-blue_4 underline-offset-2 font-extrabold">
										Choose File
									</span>
								</p>
							</>
						)}
						{error && (
							<div className="w-full overflow-hidden text-sm text-red-600">
								{error}
							</div>
						)}
					</div>
				</Card>
				<div className="flex flex-wrap justify-between">
					<p className="text-xs text-gray-500 mt-1">
						Supported formats: {acceptedFormats}
					</p>
					<p className="text-xs text-gray-500 mt-1">
						Maximum Size: {maxSize}MB
					</p>
				</div>
			</div>
		</div>
	);
}

interface DocumentTabProps {
	handleTabChange: (tab: string) => void;
	form: ReturnType<typeof useForm<FormData>>;
}

export default function DocumentTab({handleTabChange, form}: DocumentTabProps) {
	const router = useRouter();
	const [files, setFiles] = useState({
		cv: null as File | string | null,
		motivationLetter: null as File | null | string,
		assignment1: null as File | null | string,
		assignment2: null as File | null | string,
		instagramStory: null as File | null | string,
		twibbon: null as File | null | string,
	});

	const {watch} = form;
	// File upload handler function

	const handleFileUpload = async (
		file: File | string | null,
		fileType: string
	) => {
		if (!file) {
			switch (fileType) {
				case "cv":
					form.setValue("cvUrl", "");
					break;
				case "motivationLetter":
					form.setValue("motivationLetterUrl", "");
					break;
				case "assignment1":
					form.setValue("assignment1Url", "");
					break;
				case "assignment2":
					form.setValue("assignment2Url", "");
					break;
				case "instagramStory":
					form.setValue("instagramStoryUrl", "");
					break;
				case "twibbon":
					form.setValue("twibbonUrl", "");
					break;
				default:
					break;
			}

			localStorage.setItem("formData", JSON.stringify(form.getValues()));
			return;
		}

		if (typeof file === "string") {
			return "nothing to upload";
		}
		console.log(file, fileType);
		if (file.type !== "application/pdf" && !file.type.includes("image")) {
			console.log("Only PDF files are allowed.");
			return;
		}
		try {
			const uploadFormData = new FormData();

			uploadFormData.append("file", file);
			uploadFormData.append("name", watch("fullName"));

			let fileLabel;

			if (fileType === "assignment1") {
				fileLabel = form.getValues().division1.toUpperCase() + "_TUGAS";
			} else if (fileType === "assignment2") {
				fileLabel = form.getValues().division2.toUpperCase() + "_TUGAS";
			} else {
				fileLabel = fileType.replace(/([A-Z])/g, " $1").toUpperCase();
			}

			uploadFormData.append("label", fileLabel);
			// set File name

			const response = await fetch("/api/upload", {
				method: "POST",
				body: uploadFormData,
			});

			const data = await response.json();

			console.log("data", data);

			// add the folderUrl to the form submission
			form.setValue("folderUrl", data.folderUrl);

			switch (fileType) {
				case "cv":
					form.setValue("cvUrl", data.fileUrl);
					setFiles((prev) => ({...prev, cv: data.fileUrl}));
					break;
				case "motivationLetter":
					form.setValue("motivationLetterUrl", data.fileUrl);
					setFiles((prev) => ({
						...prev,
						motivationLetter: data.fileUrl,
					}));
					break;
				case "assignment1":
					form.setValue("assignment1Url", data.fileUrl);
					setFiles((prev) => ({...prev, assignment1: data.fileUrl}));
					break;
				case "assignment2":
					form.setValue("assignment2Url", data.fileUrl);
					setFiles((prev) => ({...prev, assignment2: data.fileUrl}));
					break;
				case "instagramStory":
					form.setValue("instagramStoryUrl", data.fileUrl);
					setFiles((prev) => ({
						...prev,
						instagramStory: data.fileUrl,
					}));
					break;
				case "twibbon":
					form.setValue("twibbonUrl", data.fileUrl);
					setFiles((prev) => ({...prev, twibbon: data.fileUrl}));
					break;
				default:
					break;
			}

			// store to localStorage
			localStorage.setItem("formData", JSON.stringify(form.getValues()));

			toast({
				title: `${fileType} uploaded successfully`,
				description: "Please proceed to the next step.",
			});
		} catch (error) {
			toast({
				title: `Failed to upload ${fileType}`,
				variant: "destructive",
				description: "Please try again.",
			});
			console.error(error);
		}
	};

	const updateFileFromLocalStorage = () => {
		// read from localStorage
		const values = JSON.parse(localStorage.getItem("formData") || "{}");

		// Map the localStorage data to the state fields
		setFiles((prevFiles) => ({
			...prevFiles,
			cv: values.cvUrl || null,
			motivationLetter: values.motivationLetterUrl || null,
			assignment1: values.assignment1Url || null,
			assignment2: values.assignment2Url || null,
			instagramStory: values.instagramStoryUrl || null,
			twibbon: values.twibbonUrl || null,
		}));
	};

	React.useEffect(() => {
		updateFileFromLocalStorage();
	}, []);

	const {toast} = useToast();

	const handleSubmitForm = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("files", files);

		if (
			!files["cv"] ||
			!files["motivationLetter"] ||
			!files["instagramStory"] ||
			!files["twibbon"] ||
			!files["assignment1"] ||
			!files["assignment2"] ||
			!files["instagramStory"]
		) {
			toast({
				title: "Please upload all required files!",
				variant: "destructive",
			});
			return;
		}

		const formData = form.getValues();

		const data = {
			fullName: formData.fullName,
			major: formData.major,
			department: formData.department,
			division1: formData.division1,
			division2: formData.division2,
			folderUrl: formData.folderUrl,
			npm: formData.npm,
			batch: formData.force,
			email: formData.email,
			phone: formData.phone,
			idLine: formData.idLine,
			otherContacts: formData.otherContacts,
		};

		try {
			const response = await fetch("/api/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.json();

			console.log("response", responseData);

			if (response.status !== 200) {
				toast({
					title: "Failed to submit form!",
					variant: "destructive",
					description: responseData.message,
				});
				return;
			}

			localStorage.removeItem("formData");
			router.push("/dashboard/upload/finish");
		} catch (error) {
			console.error(error);
			toast({
				title: "Failed to submit form!",
				variant: "destructive",
				description: "Please try again.",
			});
			return;
		}

		console.log("forms to be submitted", form.getValues());

		toast({
			title: "Thank you for submitting your documents!",
			description: "Your documents have been successfully uploaded.",
		});
		// window.location.href = "upload/finish";
	};

	return (
		<form onSubmit={handleSubmitForm} className="mt-9 space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FileUpload
					label="Curriculum Vitae (CV)"
					note="NOTE: Must use ATS CV"
					acceptedFormats=".pdf"
					maxSize={10}
					file={files.cv}
					onChange={(file) => {
						setFiles((prev) => ({...prev, cv: file}));
						handleFileUpload(file, "cv");
					}}
				/>
				<FileUpload
					label="Motivation Letter"
					acceptedFormats=".pdf"
					maxSize={15}
					file={files.motivationLetter}
					onChange={(file) => {
						setFiles((prev) => ({...prev, motivationLetter: file}));
						handleFileUpload(file, "motivationLetter");
					}}
				/>
				<FileUpload
					label="Optional Division Assignment 1"
					acceptedFormats=".pdf"
					maxSize={10}
					file={files.assignment1}
					onChange={(file) => {
						setFiles((prev) => ({...prev, assignment1: file}));
						handleFileUpload(file, "assignment1");
					}}
				/>
				<FileUpload
					label="Optional Division Assignment 2"
					acceptedFormats=".pdf"
					maxSize={15}
					file={files.assignment2}
					onChange={(file) => {
						setFiles((prev) => ({...prev, assignment2: file}));
						handleFileUpload(file, "assignment2");
					}}
				/>
			</div>

			<div className="space-y-4">
				<div className="prose prose-sm max-w-none">
					<p>
						Prospective staff are{" "}
						<span className="font-bold">required</span> to post a{" "}
						<span className="text-blue_4 font-bold">twibbon</span>{" "}
						on SG (Instagram Story),{" "}
						<span className="text-blue_4 font-bold">mention</span>{" "}
						@exercise.ftui, and include a{" "}
						<span className="text-blue_4 font-bold">
							screenshot
						</span>{" "}
						following @exercise.ftui.
					</p>
					<p>
						Here&apos;s the twibbon link:{" "}
						<a
							href="https://www.twibbon.com/[PLACEHOLDER]"
							className="text-blue_4 hover:underline"
						>
							https://www.twibbon.com/[PLACEHOLDER]
						</a>
					</p>
					<p>
						Here is the Oprec link that you can include:{" "}
						<span className="text-blue_4">link web oprec</span>
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FileUpload
						label="Instagram Story Upload"
						acceptedFormats=".png,.jpg,.jpeg"
						maxSize={10}
						file={files.instagramStory}
						onChange={(file) => {
							setFiles((prev) => ({
								...prev,
								instagramStory: file,
							}));
							handleFileUpload(file, "instagramStory");
						}}
					/>
					<FileUpload
						label="Twibbon InstaStory Upload"
						acceptedFormats=".png,.jpg,.jpeg"
						maxSize={15}
						file={files.twibbon}
						onChange={(file) => {
							setFiles((prev) => ({...prev, twibbon: file}));
							handleFileUpload(file, "twibbon");
						}}
					/>
				</div>
			</div>
			<div className="mt-5 flex justify-center w-full md:w-auto md:justify-end space-x-4">
				<Button
					onClick={() => handleTabChange("personal")}
					type="button"
					variant="outline"
					className="text-blue_3 w-full md:max-w-40"
				>
					Back
				</Button>
				<Button
					type="submit"
					className="md:max-w-40 w-full bg-blue_3 hover:bg-blue_4"
				>
					Submit
				</Button>
			</div>
		</form>
	);
}

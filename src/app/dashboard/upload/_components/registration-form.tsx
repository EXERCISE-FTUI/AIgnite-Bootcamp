"use client";

import * as React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Control, SubmitHandler, useForm} from "react-hook-form";
import DocumentTab from "./document-tab";
import SelectInput from "./SelectInput";
import {DepartementsList} from "@/utils/information";

export const Departements = [
	{
		value: "DTSL",
		key: "dtsl",
		major: ["Teknik Sipil", "Teknik Lingkungan"],
	},
	{
		value: "DTM",
		key: "dtm",
		major: ["Teknik Mesin", "Teknik Perkapalan"],
	},
	{
		value: "DTE",
		key: "dte",
		major: ["Teknik Komputer", "Teknik Elektro", "Teknik Biomedik"],
	},
	{
		value: "DTMM",
		key: "dtmm",
		major: ["Teknik Metalurgi dan Material"],
	},
	{
		value: "DA",
		key: "da",
		major: ["Arsitektur", "Arsitektur Interior"],
	},
	{
		value: "DTK",
		key: "dtk",
		major: ["Teknik Kimia", "Teknik Bioproses"],
	},
	{
		value: "DTI",
		key: "dti",
		major: ["Teknik Industri"],
	},
	{
		value: "PI",
		key: "pi",
		major: [
			"Teknik Sipil",
			"Teknik Mesin",
			"Teknik Elektro",
			"Teknik Metalurgi dan Material",
			"Arsitektur",
			"Teknik Kimia",
			"Teknik Industri",
			"Teknik Perkapalan",
			"Teknik Bioproses",
			"Teknik Komputer",
			"Teknik Lingkungan",
		],
	},
];

const forces = [
	{value: "2024", label: "2024"},
	{value: "2023", label: "2023"},
];

const divisions = [
	{value: "software", label: "Software"},
	{value: "hardware", label: "Hardware"},
	{value: "finance_and_secretary", label: "Finance and Secretary"},
	{value: "training_and_development", label: "Training and Development"},
	{value: "creative_marketing", label: "Creative Marketing"},
	{value: "human_resources", label: "Human Resources"},
	{value: "project_manager", label: "Project Manager"},
];

export interface FormData {
	user_id: string;
	fullName: string;
	npm: string;
	department: string;
	major: string;
	force: string;
	email: string;
	phone: string;
	idLine: string;
	otherContacts: string;
	division1: string;
	division2: string;
	folderUrl: string;
	cvUrl: string;
	motivationLetterUrl: string;
	assignment1Url: string;
	assignment2Url: string;
	instagramStoryUrl: string;
	twibbonUrl: string;
}

interface RegistrationFormProps {
	form: ReturnType<typeof useForm<FormData>>;
	onSubmit: SubmitHandler<FormData>;
	handleSubmit: (callback: (data: FormData) => void) => () => void;
	control: Control<FormData>;
	email: string;
}

export default function RegistrationForm({
	form,
	onSubmit,
	handleSubmit,
	control,
	email,
}: RegistrationFormProps) {
	const [activeTab, setActiveTab] = React.useState("personal");

	React.useEffect(() => {
		const savedFormData = localStorage.getItem("formData");
		if (savedFormData) {
			const parsedData = JSON.parse(savedFormData);
			Object.keys(parsedData).forEach((key) => {
				form.setValue(key as keyof FormData, parsedData[key]);
			});
		}
	}, [form]);

	React.useEffect(() => {
		if (email) {
			form.setValue("email", email);
		}
	}, [email, form]);

	const handleTabChange = async (value: string) => {
		if (value === "document") {
			const isValid = await form.trigger();
			if (isValid) {
				setActiveTab(value);
				handleSubmit(onSubmit)();
			}
			return;
		}
		setActiveTab(value);
	};

	const saveFormDataToLocalStorage = () => {
		localStorage.setItem("formData", JSON.stringify(form.getValues()));
	};

	return (
		<div className="w-full max-w-3xl mx-auto p-4 lg:px-4 px-8 space-y-6">
			<Tabs
				value={activeTab}
				onValueChange={handleTabChange}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="personal"
						className="data-[state=active]:bg-[#584B7C] data-[state=active]:text-white bg-gray-200"
					>
						Personal Information
					</TabsTrigger>
					<TabsTrigger
						value="document"
						className="data-[state=active]:bg-[#584B7C] data-[state=active]:text-white bg-gray-200"
					>
						Document
					</TabsTrigger>
				</TabsList>
				<TabsContent value="personal" className="space-y-6 mt-6">
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							onChange={saveFormDataToLocalStorage}
							className="space-y-6"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6">
								<FormField
									control={control}
									name="fullName"
									rules={{required: "Full name is required"}}
									render={({field}) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Lorem Ipsum"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={control}
									name="npm"
									rules={{required: "NPM is required"}}
									render={({field}) => {
										console.log("npm", field);
										return (
											<FormItem>
												<FormLabel>NPM</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="2306***"
														{...field}
														className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										);
									}}
								/>

								<FormField
									control={control}
									name="department"
									rules={{required: "Department is required"}}
									render={({field}) => {
										return (
											<FormItem>
												<FormLabel>
													Department
												</FormLabel>

												<SelectInput
													field={field}
													options={DepartementsList}
												/>
												<FormMessage />
											</FormItem>
										);
									}}
								/>

								<FormField
									control={control}
									name="major"
									rules={{required: "Major is required"}}
									render={({field}) => (
										<FormItem>
											<FormLabel>Major</FormLabel>
											<SelectInput
												field={field}
												disabled={
													!form.watch("department")
												}
												options={
													DepartementsList.find(
														(item) =>
															item.value ===
															form.watch(
																"department"
															)
													)?.major.map((major) => ({
														value: major,
														label: major,
													})) || []
												}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={control}
									name="force"
									rules={{required: "Force is required"}}
									render={({field}) => (
										<FormItem>
											<FormLabel></FormLabel>
											<SelectInput
												field={field}
												options={forces}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={control}
									name="email"
									disabled={true}
									rules={{
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address",
										},
									}}
									render={({field}) => (
										<FormItem>
											<FormLabel>E-mail</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="Lorem Ipsum"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={control}
									name="phone"
									rules={{
										required: "Phone number is required",
										pattern: {
											value: /^08\d{8,}$/,
											message:
												"Phone number must start with 08 and have at least 10 digits",
										},
									}}
									render={({field}) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													type="number"
													className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
													placeholder="08***"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={control}
									name="idLine"
									rules={{required: "ID Line is required"}}
									render={({field}) => (
										<FormItem>
											<FormLabel>ID Line</FormLabel>
											<FormControl>
												<Input
													placeholder="Lorem Ipsum"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={control}
								name="otherContacts"
								rules={{required: "Other contact is required"}}
								render={({field}) => (
									<FormItem>
										<FormLabel>
											Other Contacts We Can Contact
										</FormLabel>
										<p className="text-sm text-muted-foreground">
											Format: ID Line/Whatsapp - Name -
											Relationship (Example:
											Friend/Sister/Mother)
										</p>
										<FormControl>
											<Input
												placeholder="08*** - Name - Relationship"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="space-y-4">
								<div className="space-y-2">
									<h3 className="text-lg font-medium text-[#584B7C]">
										Here you will choose the division you
										want!
									</h3>
									<p className="text-sm">
										Booklet (Division Description) can be
										seen via the link:{" "}
										<a
											href="#"
											className="text-[#584B7C] hover:underline"
										>
											link booklet
										</a>
									</p>
									<p className="text-sm">
										Division assignments can be accessed via
										the link:{" "}
										<a
											href="#"
											className="text-[#584B7C] hover:underline"
										>
											link tugas divisi
										</a>
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<FormField
										control={control}
										name="division1"
										rules={{
											required: "Division 1 is required",
										}}
										render={({field}) => (
											<FormItem>
												<FormLabel>
													Division (Option 1)
												</FormLabel>
												<SelectInput
													field={field}
													options={divisions}
													otherDivision={form.watch(
														"division2"
													)}
												/>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={control}
										name="division2"
										rules={{
											required: "Division 2 is required",
										}}
										render={({field}) => (
											<FormItem>
												<FormLabel>
													Division (Option 2)
												</FormLabel>
												<SelectInput
													field={field}
													options={divisions}
													otherDivision={form.watch(
														"division1"
													)}
												/>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className="flex justify-center w-full md:w-auto md:justify-end space-x-4">
								<Button
									onClick={() => handleTabChange("personal")}
									type="button"
									variant="outline"
									className="text-blue_3 w-full md:max-w-40"
								>
									Back
								</Button>
								<Button
									onClick={() => handleTabChange("document")}
									type="button"
									className="md:max-w-40 w-full bg-blue_3 hover:bg-blue_4"
								>
									Next
								</Button>
							</div>
						</form>
					</Form>
				</TabsContent>
				<TabsContent value="document">
					<DocumentTab
						handleTabChange={handleTabChange}
						form={form}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}

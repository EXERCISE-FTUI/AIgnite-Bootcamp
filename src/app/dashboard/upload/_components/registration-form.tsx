"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import DocumentTab from "./document-tab";
import SelectInput from "./SelectInput";
import { useState, useCallback, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { getReferralCode } from "@/utils/referral";
import { DepartementsList } from "@/utils/information";

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

const paths = [
    { value: "software", label: "Software" },
    { value: "hardware", label: "Hardware" },
    { value: "uiux", label: "UI/UX" },
];

export interface FormData {
    user_id: string;
    // Data diri
    firstName: string;
    lastName: string;
    email: string;
    noTelp: string;
    idLine: string;
    department: string;
    major: string;
    npm: string;
    selectedPath: string; // software, hardware, uiux

    // Kode Referral (Optional)
    referralCode?: string;

    // Upload dokumen
    cvAtsUrl: string;
    essayMotletUrl: string;
    twibbonUrl: string;
}

interface RegistrationFormProps {
    email: string;
}

export default function RegistrationForm({ email }: RegistrationFormProps) {
    const [activeTab, setActiveTab] = React.useState("personal");
    const [referralValidation, setReferralValidation] = useState<{
        status: "idle" | "loading" | "valid" | "invalid";
        message: string;
        referrerName?: string;
    }>({ status: "idle", message: "" });
    const [isReferralValid, setIsReferralValid] = useState(true); // Allow proceeding by default
    const form = useForm<FormData>({
        defaultValues: {
            user_id: "",
            // Data diri
            firstName: "",
            lastName: "",
            email: email,
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
            referralCode: "",
        },
    });
    const { handleSubmit, control } = form;
    const onSubmit = () => {};

    React.useEffect(() => {
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);
            Object.keys(parsedData).forEach(key => {
                form.setValue(key as keyof FormData, parsedData[key]);
            });
        }
    }, [form]);

    React.useEffect(() => {
        if (email) {
            form.setValue("email", email);
        }
    }, [email, form]);

    // Client-side referral code validation (6 alphanumeric characters)
    const validateReferralCode = useCallback((referralCode: string) => {
        if (!referralCode || referralCode.trim() === "") {
            setReferralValidation({ status: "idle", message: "" });
            setIsReferralValid(true);
            return;
        }

        const trimmedCode = referralCode.trim();
        // Validate: exactly 6 alphanumeric characters
        const isValid = /^[A-Z0-9]{6}$/.test(trimmedCode);

        if (isValid) {
            setReferralValidation({
                status: "valid",
                message: "",
            });
            setIsReferralValid(true);
        } else {
            setReferralValidation({
                status: "invalid",
                message:
                    "Referral code must be exactly 6 characters (letters and numbers only)",
            });
            setIsReferralValid(false);
        }
    }, []);

    // Auto-fill referral code from localStorage
    useEffect(() => {
        const storedReferralCode = getReferralCode();
        if (storedReferralCode) {
            form.setValue("referralCode", storedReferralCode);
            validateReferralCode(storedReferralCode);
        }
    }, [form, validateReferralCode]);

    const handleTabChange = async (value: string) => {
        if (value === "document") {
            const isValid = await form.trigger();
            const referralCode = form.getValues("referralCode");

            // Check if referral code is provided but invalid
            const shouldBlockProgress =
                referralCode && referralCode.trim() !== "" && !isReferralValid;

            if (isValid && !shouldBlockProgress) {
                setActiveTab(value);
                handleSubmit(onSubmit)();
            } else if (shouldBlockProgress) {
                // Show error message for invalid referral code
                setReferralValidation({
                    status: "invalid",
                    message:
                        "Please enter a valid referral code or leave it empty",
                });
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
                                    name="firstName"
                                    rules={{
                                        required: "First name is required",
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="lastName"
                                    rules={{
                                        required: "Last name is required",
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
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
                                    rules={{ required: "NPM is required" }}
                                    render={({ field }) => {
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
                                    rules={{
                                        required: "Department is required",
                                    }}
                                    render={({ field }) => {
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
                                    rules={{ required: "Major is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Major</FormLabel>
                                            <SelectInput
                                                field={field}
                                                disabled={
                                                    !form.watch("department")
                                                }
                                                options={
                                                    DepartementsList.find(
                                                        item =>
                                                            item.value ===
                                                            form.watch(
                                                                "department"
                                                            )
                                                    )?.major.map(major => ({
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
                                    name="email"
                                    disabled={true}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    }}
                                    render={({ field }) => (
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
                                    name="noTelp"
                                    rules={{
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^08\d{8,}$/,
                                            message:
                                                "Phone number must start with 08 and have at least 10 digits",
                                        },
                                    }}
                                    render={({ field }) => (
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
                                    rules={{ required: "ID Line is required" }}
                                    render={({ field }) => (
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

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium text-[#584B7C]">
                                        Choose your learning path!
                                    </h3>
                                    <p className="text-sm">
                                        Select the path that best matches your
                                        interests and career goals.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <FormField
                                        control={control}
                                        name="selectedPath"
                                        rules={{
                                            required:
                                                "Learning path is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Learning Path
                                                </FormLabel>
                                                <SelectInput
                                                    field={field}
                                                    options={paths}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <FormField
                                control={control}
                                name="referralCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Referral Code (Optional)
                                        </FormLabel>
                                        <p className="text-sm text-muted-foreground">
                                            If you have a referral code from a
                                            friend, enter it here.
                                        </p>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter referral code"
                                                    maxLength={6}
                                                    {...field}
                                                    onChange={e => {
                                                        const upperValue =
                                                            e.target.value.toUpperCase();
                                                        field.onChange(
                                                            upperValue
                                                        );
                                                        validateReferralCode(
                                                            upperValue
                                                        );
                                                    }}
                                                    className={`pr-10 ${
                                                        referralValidation.status ===
                                                        "valid"
                                                            ? "border-green-500"
                                                            : referralValidation.status ===
                                                              "invalid"
                                                            ? "border-red-500"
                                                            : ""
                                                    }`}
                                                />
                                            </FormControl>
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                {referralValidation.status ===
                                                    "valid" && (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                                {referralValidation.status ===
                                                    "invalid" && (
                                                    <XCircle className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                        {referralValidation.message && (
                                            <p
                                                className={`text-sm mt-1 ${
                                                    referralValidation.status ===
                                                    "valid"
                                                        ? "text-green-600"
                                                        : referralValidation.status ===
                                                          "invalid"
                                                        ? "text-red-600"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {referralValidation.message}
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

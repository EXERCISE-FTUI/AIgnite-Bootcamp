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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import DocumentTab from "./document-tab";

const departments = [
  { value: "dte", label: "DTE" },
  { value: "other", label: "Other" },
];

const majors = [
  { value: "teknik-elektro", label: "Teknik Elektro" },
  { value: "teknik-komputer", label: "Teknik Komputer" },
  { value: "teknik-biomedik", label: "Teknik Biomedik" },
  { value: "other", label: "Other" },
];

const forces = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "other", label: "Other" },
];

const divisions = [
  { value: "software", label: "Software" },
  { value: "hardware", label: "Hardware" },
  { value: "finance_and_secretary", label: "Finance and Secretary" },
  { value: "training_and_development", label: "Training and Development" },
  { value: "creative_marketing", label: "Creative Marketing" },
  { value: "human_resources", label: "Human Resources" },
  { value: "project_manager", label: "Project Manager" },
];

interface FormData {
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
}

interface RegistrationFormProps {
  form: ReturnType<typeof useForm<FormData>>;
  onSubmit: SubmitHandler<FormData>;
  handleSubmit: (callback: (data: FormData) => void) => () => void;
  handleFileUpload: (file: File | null, type: string) => void;
  control: Control<FormData>;
}

export default function RegistrationForm({
  form,
  onSubmit,
  handleSubmit,
  control,
  handleFileUpload,
}: RegistrationFormProps) {
  const [activeTab, setActiveTab] = React.useState("personal");

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

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-[#584B7C] data-[state=active]:text-white"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="document"
            className="data-[state=active]:bg-[#584B7C] data-[state=active]:text-white"
          >
            Document
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-6 mt-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name="fullName"
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Lorem Ipsum" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="npm"
                  rules={{ required: "NPM is required" }}
                  render={({ field }) => (
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
                  )}
                />

                <FormField
                  control={control}
                  name="department"
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem
                              key={department.value}
                              value={department.value}
                            >
                              {department.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="major"
                  rules={{ required: "Major is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select major" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {majors.map((major) => (
                            <SelectItem key={major.value} value={major.value}>
                              {major.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="force"
                  rules={{ required: "Force is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Force</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select force" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {forces.map((force) => (
                            <SelectItem key={force.value} value={force.value}>
                              {force.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
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
                  name="phone"
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
                        <Input placeholder="Lorem Ipsum" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="otherContacts"
                rules={{ required: "Other contact is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Contacts We Can Contact</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Format: ID Line/Whatsapp - Name - Relationship (Example:
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
                    Here you will choose the division you want!
                  </h3>
                  <p className="text-sm">
                    Booklet (Division Description) can be seen via the link:{" "}
                    <a href="#" className="text-[#584B7C] hover:underline">
                      link booklet
                    </a>
                  </p>
                  <p className="text-sm">
                    Division assignments can be accessed via the link:{" "}
                    <a href="#" className="text-[#584B7C] hover:underline">
                      link tugas divisi
                    </a>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="division1"
                    rules={{ required: "Division 1 is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division (Option 1)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisions.map((division) => (
                              <SelectItem
                                key={division.value}
                                value={division.value}
                                disabled={
                                  (division.value === "software" ||
                                    division.value === "hardware") &&
                                  ["software", "hardware"].includes(
                                    form.watch("division2")
                                  )
                                }
                              >
                                {division.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="division2"
                    rules={{ required: "Division 2 is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division (Option 2)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisions.map((division) => (
                              <SelectItem
                                key={division.value}
                                value={division.value}
                                disabled={
                                  (division.value === "software" ||
                                    division.value === "hardware") &&
                                  ["software", "hardware"].includes(
                                    form.watch("division1")
                                  )
                                }
                              >
                                {division.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
            handleFileUpload={handleFileUpload}
            handleTabChange={handleTabChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

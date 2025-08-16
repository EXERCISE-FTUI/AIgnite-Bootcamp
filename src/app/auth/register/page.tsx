"use client";

import {useState} from "react";
import {RegisterForm} from "./_components/RegisterForm";
import Image from "next/image";
import {useToast} from "@/hooks/use-toast";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {Check} from "lucide-react";
import Link from "next/link";

const Page = () => {
	const {toast} = useToast();
	const [registerData, setRegisterData] = useState({email: "", password: ""});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [step, setStep] = useState(1);

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault(); // Prevent form submission
		if (registerData.password !== confirmPassword) {
			toast({
				title: "Password do not match!",
				variant: "destructive",
				description: "Your passwords do not match. Please try again.",
			});
			return;
		}

		const data = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerData),
		});

		const response = await data.json();

		console.log(response);

		// const response = await supabase.auth.signUp({
		// 	email: registerData.email,
		// 	password: registerData.password,
		// 	options: {
		// 		emailRedirectTo: window.location.origin + "/login",
		// 	},
		// });

		if (response.error) {
			toast({
				title: response.error,
				variant: "destructive",
				description: response.error.message,
			});
		} else {
			toast({
				color: "green",
				title: "Registration successful!",
				description: "Please check your email for a verification link.",
			});
			setStep(2);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center mt-0 lg:mt-24 lg:px-32">
			{step === 1 ? (
				<>
					<h1 className=" flex text-purple_4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
						Register
					</h1>
					<div className="mt-5 md:mt-0 w-full items-center grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
						<div className="w-full lg:px-0 px-8 col-span-1 items-center justify-center flex">
							<RegisterForm
								handleRegister={handleRegister}
								setRegisterData={setRegisterData}
								setconfirmPassword={setConfirmPassword}
								registerData={registerData}
							/>
						</div>
						<div className="w-full col-span-1 items-center justify-center flex">
							<Image
								src="/Graphic.svg"
								alt="logo"
								width={10000}
								height={10000}
								className="hidden md:flex w-full object-contain"
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<h1 className=" flex text-purple_4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
						Register
					</h1>
					<div className="mt-5 md:mt-0 w-full items-center grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
						<div className="w-full lg:px-0 px-8 col-span-1 items-center justify-center flex">
							<Card className="w-full max-w-[400px] p-1 ">
								<CardHeader>
									<CardTitle className="text-xl text-center font-semibold">
										Email Sent!
									</CardTitle>
								</CardHeader>

								<CardContent className="space-y-4">
									<Check size={50} className="mx-auto" />

									<div className="flex flex-col">
										<CardDescription className="text-center text-purple_4 font-bold text-xl">
											Please Verify Your Email
										</CardDescription>

										<CardDescription className="text-center">
											Please check your email and click
											the link to verify your account.
										</CardDescription>
									</div>

									<CardDescription className="text-center">
										Didn&apos;t receive an email?{" "}
										<Link
											href="https://api.whatsapp.com/send/?phone=%2B6282113383767"
											target="_blank"
											className="text-purple_4 hover:underline"
										>
											Contact Support
										</Link>
									</CardDescription>
								</CardContent>
							</Card>
						</div>
						<div className="w-full col-span-1 items-center justify-center flex">
							<Image
								src="/Graphic.svg"
								alt="logo"
								width={10000}
								height={10000}
								className="hidden md:flex w-full object-contain"
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Page;

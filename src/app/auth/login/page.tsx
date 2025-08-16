"use client";

import {useState} from "react";
import {LoginForm} from "./_components/LoginForm";
import Image from "next/image";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

export default function LoginPage() {
	const {toast} = useToast();
	const [loginData, setLoginData] = useState({email: "", password: ""});
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault(); // Prevent form submission

		const fetchResponse = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		});

		const response = await fetchResponse.json();

		if (response.error) {
			toast({
				title: response.error,
				variant: "destructive",
				description: response.error.message,
			});
		} else {
			toast({
				title: "Login successful!",
			});
			router.push("/dashboard");
			window.location.reload();
		}
		setLoading(false);
	}

	return (
		<div className="flex flex-col justify-center items-center mt-0 lg:mt-24 lg:px-32">
			<h1 className=" flex text-purple_4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
				Login
			</h1>
			<div className="mt-5 md:mt-0 w-full items-center grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
				<div className="w-full lg:px-0 px-8 col-span-1 items-center justify-center flex">
					<LoginForm
						handleLogin={handleLogin}
						setLoginData={setLoginData}
						loginData={loginData}
						loading={loading}
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
		</div>
	);
}

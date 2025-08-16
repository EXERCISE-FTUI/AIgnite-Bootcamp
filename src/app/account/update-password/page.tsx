"use client";

import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
// import { supabase } from "@/app/utils/supabase/supabase";
import {NewPasswordForm} from "./_components/NewPasswordForm";
import {createClient} from "@/utils/supabase/client";

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const {toast} = useToast();
	const [loginData, setLoginData] = useState({email: "", password: ""});
	const [confirmPassword, setConfirmPassword] = useState("");
	const supabase = createClient();

	async function handleReset(e: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();
		if (loginData.password !== confirmPassword) {
			toast({
				title: "Password do not match!",
				variant: "destructive",
				description: "Your passwords do not match. Please try again.",
			});
			setLoading(false);
			return;
		}
		const response = await (
			await supabase
		).auth.updateUser({
			password: loginData.password,
		});

		if (response.error) {
			toast({
				title: "Create new password failed",
				variant: "destructive",
				description: response.error.message,
			});
		} else {
			toast({
				title: "Create new password successful!",
				description: "You have successfully created a new password.",
			});
			window.location.href = "/login";
		}
		setLoading(false);
	}

	return (
		<div className="flex flex-col items-center min-h-screen">
			<h1 className="mt-36 text-purple_4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
				New Password
			</h1>
			<div className="flex w-full h-screen items-center -translate-y-40 justify-center">
				<NewPasswordForm
					handleReset={handleReset}
					setLoginData={setLoginData}
					loginData={loginData}
					loading={loading}
					setConfirmPassword={setConfirmPassword}
				/>
			</div>
		</div>
	);
}

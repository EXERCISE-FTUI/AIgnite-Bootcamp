"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {Loader} from "lucide-react";
import {signInWithGoogle} from "@/utils/action";

interface LoginFormProps {
	handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	setLoginData: (data: {email: string; password: string}) => void;
	loginData: {email: string; password: string};
	loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
	handleLogin,
	setLoginData,
	loginData,
	loading,
}) => {
	return (
		<Card className="w-full max-w-[400px] p-1">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Login to your Account
				</CardTitle>
				<CardDescription>Enter your email and password</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleLogin}>
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="text-sm text-gray-700"
						>
							Email
						</label>
						<Input
							required
							id="email"
							type="email"
							placeholder="Enter your email"
							className="w-full lg:text-md text-sm"
							onChange={(e) =>
								setLoginData({
									...loginData,
									email: e.target.value,
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="text-sm text-gray-700"
							>
								Password
							</label>
							<Link
								href="/forgot-password"
								className="text-sm text-gray-500 hover:text-gray-700"
							>
								Forgot Password?
							</Link>
						</div>
						<Input
							required
							id="password"
							type="password"
							placeholder="Enter your password"
							className="w-full lg:text-md text-sm"
							onChange={(e) =>
								setLoginData({
									...loginData,
									password: e.target.value,
								})
							}
						/>
					</div>
					<Button
						type="submit"
						className="w-full bg-[#584890] hover:bg-[#4a3d7a]"
					>
						{loading ? (
							<Loader className="animate-spin" />
						) : (
							"Login"
						)}
					</Button>
				</form>
				<div className="space-y-4 mt-4">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-4 text-gray-500">
								OR
							</span>
						</div>
					</div>
					<Button
						variant="outline"
						className="w-full relative flex text-center"
						onClick={signInWithGoogle}
					>
						<Image
							src="/google.svg"
							alt="Google Logo"
							width={24}
							height={24}
							className="absolute left-3"
						/>
						<p className=" font-medium">Continue with Google</p>
					</Button>
					<div className="text-center text-sm text-gray_3 font-medium">
						Don&apos;t have an account?{" "}
						<Link
							href="/auth/register"
							className="font-semibold text-black hover:text-[#4a3d7a]"
						>
							Register
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

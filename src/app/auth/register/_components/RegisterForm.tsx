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
import {signInWithGoogle} from "@/utils/action";

interface LoginFormProps {
	handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	setRegisterData: (data: {email: string; password: string}) => void;
	registerData: {email: string; password: string};
	setconfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const RegisterForm: React.FC<LoginFormProps> = ({
	handleRegister,
	setRegisterData,
	registerData,
	setconfirmPassword,
}) => {
	return (
		<Card className="w-full max-w-[400px] p-1 ">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Create your Account
				</CardTitle>
				<CardDescription>
					Enter your email and create your password
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleRegister}>
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="text-sm text-gray-700"
						>
							Email
						</label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							className="w-full"
							onChange={(e) =>
								setRegisterData({
									...registerData,
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
						</div>
						<Input
							id="password"
							type="password"
							required
							placeholder="Enter your password"
							className="w-full"
							onChange={(e) =>
								setRegisterData({
									...registerData,
									password: e.target.value,
								})
							}
						/>
						<div className="flex items-center justify-between">
							<label
								htmlFor="confirm-password"
								className="text-sm text-gray-700"
							>
								Password
							</label>
						</div>
						<Input
							id="confirm-password"
							required
							type="password"
							placeholder="Enter your password"
							className="w-full"
							onChange={(e) => setconfirmPassword(e.target.value)}
						/>
					</div>
					<Button
						type="submit"
						className="w-full bg-[#584890] hover:bg-[#4a3d7a]"
					>
						Register
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
						<p className="font-medium">Continue with Google</p>
					</Button>
					<div className="text-center text-sm text-gray_3 font-medium">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="font-semibold text-black hover:text-[#4a3d7a]"
						>
							Login
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

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
import {Loader} from "lucide-react";

interface LoginFormProps {
	handleReset: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	setLoginData: (data: {email: string}) => void;
	loginData: {email: string};
	loading: boolean;
}

export const ForgotPasswordForm: React.FC<LoginFormProps> = ({
	handleReset,
	setLoginData,
	loginData,
	loading,
}) => {
	return (
		<Card className="w-full max-w-[400px] p-1 ">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Reset Your Password
				</CardTitle>
				<CardDescription>
					Enter your old email for us to send verification link
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleReset}>
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
								setLoginData({
									...loginData,
									email: e.target.value,
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
							"Send Verification Link"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

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
	setLoginData: (data: {email: string; password: string}) => void;
	loginData: {email: string};
	loading: boolean;
	setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const NewPasswordForm: React.FC<LoginFormProps> = ({
	handleReset,
	setLoginData,
	loginData,
	loading,
	setConfirmPassword,
}) => {
	return (
		<Card className="w-full max-w-[400px] p-1 ">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Create Your New Password
				</CardTitle>
				<CardDescription>
					This will override your old password
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleReset}>
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
								setLoginData({
									...loginData,
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
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<Button
						type="submit"
						className="w-full bg-[#584890] hover:bg-[#4a3d7a]"
					>
						{loading ? (
							<Loader className="animate-spin" />
						) : (
							"Change Password"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

"use client";

import Link from "next/link";
import {Button} from "../ui/button";
import {LineGroupLink} from "@/utils/information";

const NormalWidthDashboard = ({userData}) => {
	const sectionStyle = "flex flex-col gap-1";
	const inputContainerStyle =
		"h-10 px-4 rounded-lg border border-[#889da8] flex items-center";
	const labelStyle = "text-[#1e1e1e] text-lg font-medium";
	const textStyle = "text-[#1e1e1e]";
	const cardStyle =
		"w-full p-4 bg-white rounded-lg shadow-[0px_1px_12px_0px_rgba(0,0,0,0.08)] flex flex-col gap-2";

	return (
		<div className="w-full max-w-[1440px] mx-auto flex flex-col items-center p-6 gap-6">
			<div className="text-center text-[#55457e] text-[40px] font-extrabold">
				Dashboard
			</div>

			{/* Content Container */}
			<div className="w-full flex-col flex items-center justify-center">
				{/* Main Content */}
				<div className="max-w-[800px] flex-col gap-4 flex">
					{/* Main Card */}
					<div className={`${cardStyle} rounded-xl`}>
						{/* Email */}
						<div className={sectionStyle}>
							<div className={labelStyle}>Email</div>
							<div className={inputContainerStyle}>
								<div className={textStyle}>
									{userData?.email}
								</div>
							</div>
						</div>

						{/* Document Status */}
						<div className={sectionStyle}>
							<div className={labelStyle}>Document Status</div>
							<div className={inputContainerStyle}>
								<div className={textStyle}>
									{userData?.status}
								</div>
							</div>
						</div>

						{/* Requirements */}
						<div className={sectionStyle}>
							<div className={labelStyle}>Requirements</div>
							<div className="p-3 px-4 rounded-lg border border-[#889da8]">
								<div className="flex justify-between">
									<div className="flex flex-col gap-2">
										<div>CV (ATS CV)</div>
										<div>Motivation Letter</div>
										<div className="flex gap-6">
											<div>Instagram Story Upload</div>
											<Link
												href="#"
												className="text-[#1e1e1e] underline"
											>
												link story upload
											</Link>
										</div>
										<div className="flex gap-6">
											<div>Twibbon InstaStory Upload</div>
											<Link
												href="#"
												className="text-[#1e1e1e] underline"
											>
												link twibbon
											</Link>
										</div>
										<div>
											Division Assigments (
											<span className="font-bold">
												check bellow here
											</span>
											)
										</div>
									</div>
									<div
										className={`flex flex-col gap-2 items-center min-w-[200px]
                      ${
							userData?.status === `NOT_SUBMITTED`
								? `text-[#889da8]`
								: `text-[#4caf50] font-bold`
						}
                      `}
									>
										{[...Array(5)].map((_, index) => (
											<div key={index}>
												{userData?.status ===
												"NOT_SUBMITTED"
													? "Empty"
													: "Submitted"}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Buttons */}
						<div className="flex justify-start gap-8 pt-3">
							{userData?.status === `NOT_SUBMITTED` && (
								<>
									<button className="h-12 px-6 py-3 bg-neutral-50 rounded-lg border-2 flex items-center border-purple_4 text-[#1e1e1e] text-xl">
										Tasks
									</button>
									<Link
										className="w-[312px] h-12 px-6 py-3 bg-[#55457e] rounded-lg flex items-center justify-center text-neutral-50 text-xl"
										href="/dashboard/upload"
									>
										Complete Requirements
									</Link>
								</>
							)}

							{userData?.status === `SUBMITTED` && (
								<div className="flex flex-col w-full mb-2">
									<p className="text-purple_4 font-bold text-lg">
										You have submitted your requirements.
										Please wait for the next step.
									</p>
									<div className="pt-2 flex w-full items-center justify-center">
										<Button
											className="bg-[#00C200] hover:bg-[#00C200] px-12 py-2 hover:-translate-y-0.5 ease-in-out transform transition-all"
											onClick={() => {
												window.open(
													LineGroupLink,
													"_blank"
												);
											}}
										>
											<img src="/lineIcon.svg" />
											Join Line Group
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* General Terms */}
					<div className={cardStyle}>
						<div className={labelStyle}>General Terms</div>
						<div className="flex flex-col gap-4">
							<div className={textStyle}>
								Lorem ipsum dolor sit amet
							</div>
							<div className={textStyle}>
								Lorem ipsum dolor sit amet
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NormalWidthDashboard;

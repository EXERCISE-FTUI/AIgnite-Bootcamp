"use client";

import {Check, X} from "lucide-react";
import Link from "next/link";
import {Button} from "../ui/button";
import {LineGroupLink} from "@/utils/information";

const SmallerWidthDashboard = ({userData}) => {
	return (
		<div className="w-full max-w-[431px] mx-auto flex flex-col px-8">
			<div className="text-center text-[#55457e] text-3xl font-extrabold font-['Inter'] w-full p-4">
				Dashboard
			</div>

			{/* Main Info Card */}
			<div className="w-full p-[13.92px] rounded-[6.96px] shadow-[0px_0.5799999833106995px_6.960000038146973px_0px_rgba(0,0,0,0.08)] flex flex-col gap-[13.92px]">
				{/* Email Section */}
				<div className="flex flex-col gap-[6.96px]">
					<div className="text-[#1e1e1e] font-medium font-['Inter']">
						Email
					</div>
					<div className="h-auto px-2 py-2 rounded-lg border border-[#889da8] flex items-center">
						<div className="font-normal font-['Inter']">
							{userData?.email}
						</div>
					</div>
				</div>

				{/* Document Status Section */}
				<div className="flex flex-col gap-[6.96px]">
					<div className="text-[#1e1e1e] font-medium font-['Inter']">
						Document Status
					</div>
					<div className="h-auto px-2 py-2 rounded-lg border border-[#889da8] flex items-center">
						<div className="font-semibold font-['Inter']">
							{userData?.status}
						</div>
					</div>
				</div>

				{/* Requirements Section */}
				<div className="flex flex-col gap-[6.96px]">
					<div className="text-[#1e1e1e] font-medium font-['Inter']">
						Requirements
					</div>
					<div className="p-2 rounded-lg w-full grid grid-cols-9 border border-[#889da8]">
						<div className="col-span-8 grid gap-[9px]">
							<div className="text-[#1e1e1e] text-[13px] overflow-auto line-clamp-1 align-center font-normal font-['Inter']">
								CV (ATS CV)
							</div>
							<div className="text-[#1e1e1e] text-[13px] overflow-auto line-clamp-1 font-normal font-['Inter']">
								Motivation Letter
							</div>
							<div className="flex gap-[13.92px]">
								<div className="text-[#1e1e1e] text-[13px] overflow-auto line-clamp-1 font-normal font-['Inter']">
									Instagram Story Upload
								</div>
								<div className="text-[#1e1e1e] text-[13px] overflow-auto line-clamp-1 font-normal font-['Inter'] underline">
									link story upload
								</div>
							</div>
							<div className="flex gap-[13.92px]">
								<div className="text-[#1e1e1e] text-[13px] overflow-auto line-clamp-1 font-normal font-['Inter']">
									Twibbon InstaStory Upload
								</div>
								<div className="text-[#1e1e1e] text-[13px] overflow-auto line-clamp-1 font-normal font-['Inter'] underline">
									link twibbon
								</div>
							</div>
							<div className="text-[#1e1e1e] text-[13px] overflow-auto line-clamp-1 font-normal font-['Inter']">
								Division Assigments (
								<span className="font-bold">
									check bellow here
								</span>
								)
							</div>
						</div>
						<div
							className={`col-span-1 flex flex-col gap-[9.28px] items-end text-[13px] overflow-auto line-clamp-1
                      ${
							userData?.status === `NOT_SUBMITTED`
								? `text-[#889da8]`
								: `text-[#4caf50] font-bold`
						}
                      `}
						>
							{[...Array(5)].map((_, index) => {
								return userData?.status == "NOT_SUBMITTED" ? (
									<X key={index} size={14} />
								) : (
									<Check key={index} size={18} />
								);
							})}
						</div>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex justify-center gap-4 pt-3">
					{userData?.status === `NOT_SUBMITTED` && (
						<>
							<button className="h-auto py-2 px-5 bg-neutral-50 rounded-lg border border-[#383f96] text-[#1e1e1e] font-normal font-['Inter']">
								Tasks
							</button>
							<Link
								href="/dashboard/upload"
								className="h-auto py-2 px-4 bg-[#55457e] rounded-lg text-neutral-50 font-normal font-['Inter']"
							>
								Complete Requirements
							</Link>
						</>
					)}

					{userData?.status === `SUBMITTED` && (
						<>
							<div className="flex flex-col w-full mb-2">
								<p className="text-purple_4 font-bold text-center">
									You have submitted your requirements. Please
									wait for the next step.
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
						</>
					)}
				</div>
			</div>

			{/* General Terms */}
			<div className="w-full p-[14.40px] mt-8 rounded-[4.80px] shadow-[0px_0.6000000238418579px_7.200000286102295px_0px_rgba(0,0,0,0.08)] flex flex-col gap-[14.40px]">
				<div className="text-[#1e1e1e] text-xl font-medium font-['Inter']">
					General Terms
				</div>
				<div className="flex flex-col gap-[31.80px]">
					<div className="text-[#1e1e1e] text-[10.80px] font-normal font-['Inter']">
						Lorem ipsum dolor sit amet
					</div>
					<div className="text-[#1e1e1e] text-[10.80px] font-normal font-['Inter']">
						Lorem ipsum dolor sit amet
					</div>
				</div>
			</div>
		</div>
	);
};

export default SmallerWidthDashboard;

import {useState} from "react";
import NormalWidth from "./normal_width_choice";
import SmallerWidth from "./smaller_width_choice";
import {divisionsContent} from "./divisionsContent";
import Link from "next/link";

const Divisions = () => {
	const [selectedIcon, setSelectedIcon] = useState<number>(0);
	const [isOpen, setIsOpen] = useState(false);

	const currentDivision = divisionsContent[selectedIcon];

	return (
		<div>
			<div className="w-full relative flex flex-col justify-center items-start gap-8 lg:gap-16 px-4 md:px-[100px] pt-6 lg:pt-[63px] pb-[64px] self-stretch bg-gradient-to-b from-[#15394a] via-[#1c465c] to-[#55457e]">
				<div id="divisions" className="absolute -top-20"></div>
				{/* Responsive Division Selector */}
				<div className="w-full flex justify-center">
					<div className="hidden min-[1020px]:block w-full">
						<NormalWidth
							selectedIcon={selectedIcon}
							setSelectedIcon={setSelectedIcon}
						/>
					</div>
					<div className="block lg:hidden w-full">
						<SmallerWidth
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							selectedIcon={selectedIcon}
							setSelectedIcon={setSelectedIcon}
						/>
					</div>
				</div>

				{/* Bagian Text */}
				<div className="w-full flex flex-col items-center justify-center">
					<div className="w-full max-w-[1200px] flex flex-col px-4 md:px-6 lg:px-8">
						<div className="text-white lg:text-start text-center text-4xl md:text-3xl lg:text-4xl font-['Inter'] font-black pb-[36px]">
							{currentDivision.title}
						</div>
						<div className="flex flex-col lg:flex-row justify-start items-start lg:gap-16 pb-[36px]">
							{/* Description Section */}
							<div className="flex-1 flex-col max-w-full lg:max-w-[569px]">
								<div className="text-white text-xl md:text-2xl font-['Inter'] font-bold pb-2">
									Description
								</div>
								<div className="text-white text-lg md:text-xl font-['Inter'] text-justify font-normal">
									{currentDivision.description}
								</div>
							</div>

							{/* Benefits Section */}
							<div className="flex-1 flex-col gap-3 max-w-full lg:max-w-[569px] mt-8 lg:mt-0">
								<div className="text-white text-xl md:text-2xl font-['Inter'] font-bold pb-2">
									Benefit
								</div>
								<div className="text-white text-lg md:text-xl font-['Inter'] font-normal">
									{currentDivision.benefits.map(
										(benefit, index) => (
											<div key={index}>• {benefit}</div>
										)
									)}
								</div>
							</div>
						</div>

						{/* Updated Button to Link */}
						<div className="h-auto flex justify-center items-center">
							<Link
								href="/dashboard"
								className="h-auto lg:px-6 py-2 bg-neutral-100 rounded-xl shadow-[0px_1px_12px_0px_rgba(157,152,179,0.25)] flex items-center justify-center transition-all duration-300"
							>
								<span className="text-[#55457e] text-lg lg:text-[28px] font-bold px-16 tracking-wide">
									Join us now!
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Divisions;

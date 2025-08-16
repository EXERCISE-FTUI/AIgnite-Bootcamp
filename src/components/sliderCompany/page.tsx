"use client";
import {motion} from "framer-motion";
import Image from "next/image";
import {almImages} from "./almImages";

const sliderCompany = () => {
	const images = [...almImages, ...almImages]; // Duplicate images for seamless loop

	return (
		<div className="w-screen overflow-hidden flex flex-col gap-10 my-12">
			<div className="text-center lg:mx-0 mx-8">
				<span className="text-blue_3 text-4xl lg:text-[56px] font-bold font-['Inter']">
					Where our Alumni{" "}
				</span>
				<span className="text-purple_4 text-4xl lg:text-[56px] font-extrabold font-['Inter']">
					Have Landed
				</span>
			</div>
			<div className="relative flex slider-company-gradient items-center ">
				<motion.div
					initial={{x: "-100%"}}
					animate={{x: 0}}
					transition={{
						duration: 90,
						repeat: Infinity,
						repeatType: "loop",
						ease: "linear",
					}}
					className="flex flex-shrink-0 space-x-4 gap-2"
				>
					{images.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={`alm${index + 1}`}
							width={128}
							height={128}
							className="w-20 md:w-32"
						/>
					))}
				</motion.div>
				<motion.div
					initial={{x: "-100%"}}
					animate={{x: 0}}
					transition={{
						duration: 90,
						repeat: Infinity,
						repeatType: "loop",
						ease: "linear",
					}}
					className="flex flex-shrink-0 space-x-4 gap-2"
				>
					{images.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={`alm${index + 1}`}
							width={128}
							height={128}
							className="w-20 md:w-32"
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default sliderCompany;

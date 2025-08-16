import React from "react";
import Image from "next/image";
import {motion} from "framer-motion";

interface BracketCardProps {
	number: number;
	message: string;
	delay: number;
}

const BracketCard: React.FC<BracketCardProps> = ({number, message, delay}) => {
	const isOdd = number % 2 !== 0;
	const bracketColor = isOdd ? "bg-blue_2" : "bg-purple_4";
	const textColor = isOdd ? "text-white_1" : "text-white_2";
	const polygonSrc = isOdd ? "/whitePoly.svg" : "/bluePoly.svg";
	const polygonTextColor = isOdd ? "text-blue_2" : "text-white_2";
	const rotation = isOdd ? "rotate-12" : "rotate-[-12deg]";

	return (
		<motion.div
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			transition={{duration: 1, delay: delay}}
			viewport={{once: true, margin: "-100px"}}
			className={`${bracketColor} w-full h-auto pl-10 lg:pl-20 pr-3 lg:pr-6 py-2 lg:py-3 text-xs lg:text-lg rounded-3xl shadow-xl z-0 relative`}
		>
			<p className={`${textColor} font-light`}>{message}</p>
			<div className="absolute top-[-12px] max-md:top-0 -left-5 lg:left-[-30px] flex justify-center items-center">
				<Image
					src={polygonSrc}
					alt="polygon"
					className="w-12 lg:w-20 lg:h-20 z-10"
					width={80}
					height={80}
				/>
				<span
					className={`absolute ${polygonTextColor} font-black text-4xl ${rotation} z-20`}
				>
					{number}
				</span>
			</div>
		</motion.div>
	);
};

const OurMission: React.FC = () => {
	const data: BracketCardProps[] = [
		{
			number: 1,
			message:
				"Creating a warm and inclusive atmosphere that fosters togetherness and strengthens relationships among members during all activities.",
			delay: 0,
		},
		{
			number: 2,
			message:
				"Empowering members to face challenges confidently, learn new skills, and grow as a united team.",
			delay: 0.2,
		},
		{
			number: 3,
			message:
				"Fostering synergy by enhancing communication, integration, and engagement, which strengthens harmony and resilience within the organization.",
			delay: 0.3,
		},
		{
			number: 4,
			message:
				"Leveraging social media to creatively express EXERCISE’s identity, build connections, and engage with audiences across various platforms.",
			delay: 0.5,
		},
		{
			number: 5,
			message:
				"Encouraging strategic collaborations with other organizations to amplify impact and expand professional networks.",
			delay: 0.6,
		},
		{
			number: 6,
			message:
				"Equipping members with adaptive and innovative skills to tackle future challenges with confidence and success.",
			delay: 0.8,
		},
	];

	return (
		<motion.div
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			transition={{duration: 1}}
			viewport={{once: true, margin: "-150px"}}
			className="w-full max-w-4xl mx-auto pb-32 flex flex-col justify-center items-center max-lg:p-5 max-lg:pr-2 relative"
		>
			<h1 className="text-7xl text-center font-normal text-blue_2 max-lg:text-5xl mb-14 max-lg:mb-5">
				Our <span className="font-black text-purple_4">Mission</span>
			</h1>
			<div className="grid grid-cols-1 w-full gap-10 max-lg:gap-6 relative max-lg:p-4">
				{data.map((item) => (
					<BracketCard
						key={item.number}
						number={item.number}
						message={item.message}
						delay={item.delay}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default OurMission;

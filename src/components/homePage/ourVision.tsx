import React from "react";
import {motion} from "framer-motion";

const OurVision = () => {
	return (
		<motion.div
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			transition={{duration: 1}}
			viewport={{once: true, margin: "-150px"}}
			className="w-full max-w-4xl mx-auto lg:mx-auto mb-40 lg:mb-44 mt-10 lg:p-0 p-8"
		>
			<h1 className="text-7xl text-center font-normal text-white max-md:text-5xl mb-8 max-md:mb-5 ">
				Exercise <span className="font-black">Bootcamp</span>
			</h1>
			<div className="w-full h-auto p-4 text-center bg-gradient-to-r from-blue_2 to-purple_4">
				<p className="text-white_1 text-md lg:text-md font-light">
					EXERCISE 2025 as a professional, inspiring, and supportive
					family where every member can grow, learn, and gain
					meaningful experiences. Bringing EXERCISE to greater
					recognition across the Faculty of Engineering and other
					faculties through innovation, a sense of family values, and
					a spirit of collaboration.
				</p>
			</div>

			<div className="w-full flex justify-center pt-8">
				<button
					className="z-10 group w-[50vh] flex items-center gap-3 justify-center px-16 py-3 rounded-xl border-2 border-white hover:border-[#0A192F] shadow-lg hover:scale-[120%] duration-100
					bg-gradient-to-r from-[#0A192F] to-[#002A5E]
					hover:from-white hover:to-white"
				>
					<div className="text-center text-white text-xl font-bold group-hover:text-[#002A5E]">
						Get Your Points Now
					</div>
				</button>
			</div>
		</motion.div>
	);
};

export default OurVision;

import {motion} from "framer-motion";

import Image from "next/image";

const DefineExer = () => {
	return (
		<motion.div
			id="aboutUs"
			className="w-full lg:max-w-5xl lg:mx-auto mb-32 lg:mb-40 mt-10 lg:px-0 px-8"
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			transition={{duration: 1}}
			viewport={{once: true, margin: "-150px"}}
		>
			<h1 className="text-4xl lg:text-5xl w-full text-white font-extrabold pb-4">
				What is...
			</h1>
			<div className="grid grid-cols-2 w-full max-md:grid-cols-1 max-md:justify-center max-md:items-center p-8">
				<div className="flex flex-col max-md:items-center max-md:justify-center">
					<div className="w-[380px] h-48 max-md:w-full max-md:h-32 items-center relative overflow-visible">
						<Image
							src="/exerBox-1.svg"
							alt="exerBox1"
							className="w-fit h-fit object-cover"
							width={380}
							height={160}
						/>
						
						{/* Top-Right Star */}
						<motion.div
							className="absolute -top-9 -right-9 w-20 h-20"
							animate={{ rotate: [0, 180, 0] }}   // spin forward then back
							transition={{
							duration: 2,        // how long one spin takes
							repeat: Infinity,   // loop forever
							repeatDelay: 1,     // wait 3s between spins
							ease: "easeInOut"
							}}
						>
						<Image
							src="/star.svg"
							alt="star"
							className="w-full h-full"
							width={46}
							height={45}
						/>
						</motion.div>
					</div>
				</div>
				<div className="lg:w-[425px] p-3 text-center h-auto m-auto self-stretch">
					<p className="text-lg font-light text-white">
						We have been innovating since{" "}
						<span className="font-bold">2016</span> with a track
						record of qualified work and have become the{" "}
						<span className="font-bold">
							largest technology organization at the Faculty of
							Engineering
						</span>
						, University of Indonesia.
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default DefineExer;

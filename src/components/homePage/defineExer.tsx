import {motion} from "framer-motion";

import Image from "next/image";

const DefineExer = () => {
	return (
		<motion.div
			id="aboutUs"
			className="w-full lg:max-w-4xl lg:mx-auto mb-32 lg:mb-40 mt-10 lg:px-0 px-8"
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			transition={{duration: 1}}
			viewport={{once: true, margin: "-150px"}}
		>
			<h1 className="text-4xl lg:text-5xl text-blue_2 font-extrabold pb-4">
				What is..
			</h1>
			<div className="grid grid-cols-2 w-full overflow-x-auto max-md:grid-cols-1 max-md:justify-center max-md:items-center">
				<div className="flex flex-col max-md:items-center max-md:justify-center">
					<Image
						src="/exerBox-1.svg"
						alt="exerBox1"
						className="w-[380px] h-40 max-md:w-full max-md:h-32 items-center"
						width={380}
						height={160}
					/>
				</div>
				<div className="lg:w-[425px] p-3 text-center h-auto m-auto self-stretch">
					<p className="text-lg text-blue_2">
						We have been innovating since{" "}
						<span className="font-black">2016</span> with a track
						record of qualified work and have become the{" "}
						<span className="font-black">
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

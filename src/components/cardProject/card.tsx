import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";
import {EffectCards} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "./Card.css";
import {projectData} from "./data";

export default function Card() {
	const projectDatas = Object.values(projectData);
	return (
		<>
			<Swiper
				effect={"cards"}
				grabCursor={true}
				modules={[EffectCards]}
				className="mySwiper max-w-[65%] lg:w-[25rem] h-[360px] md:h-[32rem] py-2"
			>
				{projectDatas.map((project, index) => (
					<SwiperSlide key={index}>
						<div className="flex flex-col justify-between h-full items-center text-center p-1 py-10 md:p-3 md:py-10 gap-4 overflow-hidden font-[inter]">
							<h1 className="text-2xl md:text-3xl mx-2 md:mx-1 font-black">
								{project.title}
							</h1>
							<Image
								src={project.img}
								alt={project.title}
								objectFit="cover"
								className="h-[96px] w-[96px] md:h-[180px] md:w-[180px]"
								width={180}
								height={180}
							/>
							<p className="text-sm md:text-lg mx-4 md:mx-4 font-normal overflow-auto">
								{project.description}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}

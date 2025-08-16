import {EmblaOptionsType} from "embla-carousel";
import Carousel from "./Carousel";
import {yearImages} from "./yearImages";

const CarouselLastYear = () => {
	const OPTIONS: EmblaOptionsType = {loop: true};
	const SLIDES = Object.values(yearImages);
	return (
		<div className="w-screen flex justify-center items-center my-12">
			<div className="w-4/5 flex flex-col justify-center items-center py-12 rounded-2xl">
				<div className="text-center text-blue_3 text-4xl lg:text-6xl font-['Inter'] mb-14">
					<span className="text-purple_4 font-black">
						What We Do{" "}
					</span>
					<span>Last Year</span>
				</div>
				<Carousel slides={SLIDES} options={OPTIONS} />
			</div>
		</div>
	);
};

export default CarouselLastYear;

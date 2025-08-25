import SwipeCards from "./card";

const CardProject = () => {
	return (
		<div>
			<div className="text-center text-5xl lg:text-6xl font-['Inter'] my-12 pt-20">
				<span className="text-white">Past </span>
				<span className="text-[#2B7696] font-black">Project</span>
			</div>
			<SwipeCards />
		</div>
	);
};

export default CardProject;

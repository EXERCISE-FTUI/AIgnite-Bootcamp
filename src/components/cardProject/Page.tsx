import SwipeCards from "./card";

const CardProject = () => {
	return (
		<div>
			<div className="text-center text-5xl lg:text-6xl font-['Inter'] my-12">
				<span className="text-blue_3">Past </span>
				<span className="text-purple_4 font-black">Project</span>
			</div>
			<SwipeCards />
		</div>
	);
};

export default CardProject;

import Image from "next/image";

const SmallWidthTimeline = () => {
	return (
		<div className="flex justify-center items-center h-[300]px px-12">
			<Image
				src="/timeline_small.svg"
				alt="timeline"
				width={100}
				height={100}
			/>
		</div>
	);
};

export default SmallWidthTimeline;

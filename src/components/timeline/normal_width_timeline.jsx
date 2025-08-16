import Image from "next/image";

const NormalWidthTimeline = () => {
	return (
		<div className="flex justify-center items-center h-[300]px max-w-[90%]">
			<Image
				src="/timeline.svg"
				alt="timeline"
				width={100}
				height={100}
			/>
		</div>
	);
};

export default NormalWidthTimeline;

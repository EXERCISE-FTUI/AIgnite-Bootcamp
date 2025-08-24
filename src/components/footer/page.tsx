"use client";
import Image from "next/image";

const Footer = () => {
	const handleClickInstagram = () => {
		window.open("https://www.instagram.com/exercise.ftui/");
	};

	const handleClickLinkedin = () => {
		window.open(
			"https://www.linkedin.com/company/exercise-ftui/",
			"_blank"
		);
	};

	return (
		<div className="w-full flex flex-col h-100 overflow-hidden bg-white relative">
			{/* Top Section */}
			<div className="w-full h-full hidden md:flex flex-row m-12 z-10">
				{/* Left Section */}
				<div className="w-1/2 h-full">
					<div className="flex flex-col items-center w-[50%] justify-center h-full mt-8">
						<Image
							src="/Exer-Footer.svg"
							alt="logo"
							className="w-72 h-36"
							width={288}
							height={144}
						/>
					</div>
				</div>

				{/* Right Section */}
				<div className="w-1/2 h-full flex flex-col justify-center mr-12 text-blue_3 font-normal">
					<div className="flex flex-row items-start gap-4 px-8 pr-24">
						<Image
							src="/location.svg"
							alt="location"
							className="w-6 h-6"
							width={24}
							height={24}
						/>
						<p className="text-md">
							Faculty of Engineering, University of Indonesia, Jl.
							Prof. DR. Ir R Roosseno, Kukusan, Beji, Depok City,
							West Java 16425
						</p>
					</div>
					<div className="flex flex-row items-start gap-4 px-8 mt-6">
						<Image
							src="/email.svg"
							alt="email"
							className="w-6 h-6"
							width={24}
							height={24}
						/>
						<p className="text-md">hr@exerciseftui.com</p>
					</div>
					<div className="flex flex-col items-start gap-2 px-8 mt-6">
						<p className="text-md font-extrabold">Follow us</p>
						<div className="flex flex-row gap-4">
							<Image
								src="/instagramWhite.svg"
								alt="instagram"
								className="w-6 h-6"
								width={24}
								height={24}
								onClick={handleClickInstagram}
							/>
							<Image
								src="/linkedinWhite.svg"
								alt="linkedin"
								className="w-6 h-6"
								width={24}
								height={24}
								onClick={handleClickLinkedin}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Section */}
			<div className="md:hidden flex flex-row gap-10 px-4 pt-8 h-auto font-normal text-blue_3">
				<div className="w-full grid grid-cols-8 gap-2 h-full">
					<div className="col-span-5 grid grid-rows-2 space-y-4 items-center justify-center h-full">
						<Image
							src="/Exer-Footer.svg"
							alt="logo"
							className="w-40 aspect-contain row-span-1"
							width={160}
							height={80}
						/>
						<div className="flex row-span-1 gap-2 items-center">
							<Image
								src="/location.svg"
								alt="location"
								className="w-6 h-6"
								width={24}
								height={24}
							/>
							<p className="text-[10px]">
								Faculty of Engineering, University of Indonesia,
								Jl. Prof. DR. Ir R Roosseno, Kukusan, Beji,
								Depok City, West Java 16425
							</p>
						</div>
					</div>
					<div className="col-span-3 grid grid-rows-2 h-full gap-7">
						<div className="row-span-1 flex flex-col items-start gap-2">
							<p className="text-lg font-medium gap-6">
								Follow us
							</p>
							<div className="flex flex-row gap-4">
								<Image
									src="/instagramWhite.svg"
									alt="instagram"
									className="w-8 h-8"
									onClick={handleClickInstagram}
									width={24}
									height={24}
								/>
								<Image
									src="/linkedinWhite.svg"
									alt="linkedin"
									className="w-8 h-8"
									onClick={handleClickLinkedin}
									width={24}
									height={24}
								/>
							</div>
						</div>
						<div className="flex row-span-1 gap-2 items-center text-xs">
							<Image
								src="/email.svg"
								alt="email"
								className="w-5 h-5"
								width={20}
								height={20}
							/>
							<p className="text-md truncate">
								hr@exerciseftui.com
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-2 mb-4 lg:mb-10 flex items-center justify-center">
				<p className="text-blue_3 font-semibold text-md">
					© 2025 Exercise FTUI.
				</p>
			</div>

			<Image
				src="/footer/aurora.png"
				alt="footer-bg"
				className="absolute -top-20 scale-[70%] -right-40 hidden lg:flex"
				width={1000}
				height={1000}
			/>
		</div>
	);
};

export default Footer;

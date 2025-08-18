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
        <div
            className="w-full flex flex-col h-auto font-light"
            style={{
                background:
                    "linear-gradient(91.66deg, #383F96 -9.64%, #0D2734 19.66%, #15394A 49.42%, #2B7696 67.43%, #645B87 97.26%)",
            }}
        >
            {/* Top Section */}
            <div className="w-full h-full hidden md:flex flex-row m-12">
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
                <div className="w-1/2 h-full flex flex-col justify-center mr-12">
                    <div className="flex flex-row items-start gap-4 px-8 pr-24">
                        <Image
                            src="/location.svg"
                            alt="location"
                            className="w-6 h-6"
                            width={24}
                            height={24}
                        />
                        <p className="text-md text-white">
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
                        <p className="text-md text-white">
                            hr@exerciseftui.com
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 px-8 mt-6">
                        <p className="text-md text-white font-extrabold">
                            Follow us
                        </p>
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
            <div className="md:hidden flex flex-row gap-10 px-4 pt-8 h-auto">
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
                            <p className="text-[10px] text-white">
                                Faculty of Engineering, University of Indonesia,
                                Jl. Prof. DR. Ir R Roosseno, Kukusan, Beji,
                                Depok City, West Java 16425
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3 grid grid-rows-2 h-full flex flex-col gap-7">
                        <div className="row-span-1 flex flex-col items-start gap-2">
                            <p className="text-lg text-white font-medium gap-6">
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
                            <p className="text-md text-white truncate">
                                hr@exerciseftui.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="w-[65%] h-full flex flex-col gap-7">
					<div className="flex flex-col items-center w-[50%] justify-center h-full mt-8">
						<Image
							src={Exer_Footer}
							alt="logo"
							className="w-full ml-16"
						/>
					</div>
					<div className="items-start flex flex-row pl-8 pr-12 max-md:pr-0">
						<Image
							src={location}
							alt="location"
							className="w-6 h-6"
						/>
						<p className="text-xs text-white">
							Faculty of Engineering, University of Indonesia, Jl.
							Prof. DR. Ir R Roosseno, Kukusan, Beji, Depok City,
							West Java 16425
						</p>
					</div>
				</div>
				<div className="w-[35%] h-full flex flex-col gap-7 mr-12">
					<div className="flex flex-col items-start gap-2 mt-6">
						<p className="text-lg text-white font-medium gap-6">
							Follow us
						</p>
						<div className="flex flex-row gap-4">
							<Image
								src={instagramWhite}
								alt="instagram"
								className="w-8 h-8"
								onClick={handleClickInstagram}
							/>
							<Image
								src={linkedinWhite}
								alt="linkedin"
								className="w-8 h-8"
								onClick={handleClickLinkedin}
							/>
						</div>
					</div>
					<div className="flex flex-row items-start gap-4 max-md:gap-2 mt-12">
						<Image src={email} alt="email" className="w-6 h-6" />
						<p className="text-md text-white">
							hr@exerciseftui.com
						</p>
					</div>
				</div> */}
            </div>
            <div className="mt-2 mb-4 lg:mb-10 flex items-center justify-center">
                <p className="text-white text-md">© 2025 Exercise FTUI.</p>
            </div>
        </div>
    );
};

export default Footer;

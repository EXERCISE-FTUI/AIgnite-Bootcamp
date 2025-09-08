import { useState } from "react";
import NormalWidth from "./normal_width_choice";
import SmallerWidth from "./smaller_width_choice";
import { divisionsContent } from "./divisionsContent";
import Link from "next/link";

const Divisions = () => {
    const [selectedIcon, setSelectedIcon] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);

    const currentDivision = divisionsContent[selectedIcon];

    return (
        <div className="mb-32 lg:mb-32 mt-10">
            <h1 className="text-8xl tracking-tighter text-center text-white max-md:text-5xl mb-8 max-md:mb-5 font-bold">
                Path <span className="font-normal text-7xl">Selection</span>
            </h1>
            <div className="w-full relative flex flex-col lg:rounded-none rounded-md justify-center items-start gap-8 lg:gap-16 px-4 md:px-[100px] pt-6 lg:pt-[63px] pb-[64px] self-stretch bg-white">
                <div id="divisions" className="absolute -top-20"></div>
                {/* Responsive Division Selector */}
                <div className="w-full flex justify-center">
                    <div className="hidden min-[1020px]:block w-full">
                        <NormalWidth
                            selectedIcon={selectedIcon}
                            setSelectedIcon={setSelectedIcon}
                        />
                    </div>
                    <div className="block lg:hidden w-full">
                        <SmallerWidth
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            selectedIcon={selectedIcon}
                            setSelectedIcon={setSelectedIcon}
                        />
                    </div>
                </div>

                {/* Bagian Text */}
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full max-w-[1200px] flex flex-col px-4 md:px-6 lg:px-8">
                        <div className="text-[#0A192F] text-center text-4xl md:text-3xl lg:text-5xl font-['Inter'] font-black pb-2">
                            {currentDivision.title}
                        </div>
                        <div className="text-[#0A192F] text-center text-2xl lg:text-3xl font-['Inter'] tracking-tighter font-semibold">
                            What will you build:
                        </div>
                        <div className="text-white rounded-md bg-purple_3 w-fit mx-auto px-4 py-1 text-center text-xl lg:text-3xl font-['Inter'] tracking-tight font-bold mb-8">
                            {currentDivision.projectTitle}
                        </div>
                        <div className="flex flex-col lg:flex-row justify-center w-full items-start lg:gap-16 pb-[36px]">
                            {/* Description Section */}
                            <div className="flex-1 flex-col max-w-full lg:max-w-[569px]">
                                <div className="text-[#0A192F] text-xl md:text-2xl font-['Inter'] font-bold pb-2">
                                    Project Description
                                </div>
                                <div className="text-[#0A192F] text-lg md:text-xl font-['Inter'] text-justify font-normal">
                                    {currentDivision.description}
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div className="flex-1 flex-col gap-3 max-w-full lg:max-w-[569px] mt-8 lg:mt-0">
                                <div className="text-[#0A192F] text-xl md:text-2xl font-['Inter'] font-bold pb-2">
                                    Modules
                                </div>
                                <div className="text-[#0A192F] text-lg md:text-xl font-['Inter'] font-normal">
                                    {currentDivision.modules.map(
                                        (benefit, index) => (
                                            <div key={index}>• {benefit}</div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Updated Button to Link */}
                        <div className="h-auto flex justify-center items-center pt-6">
                            <Link
                                href="/dashboard"
                                className="h-auto group lg:px-6 py-2 bg-gradient-to-r from-[#0A192F] to-[#002A5E] rounded-xl shadow-[0px_1px_12px_0px_rgba(157,152,179,0.25)] flex items-center justify-center transition-all duration-300 hover:border-[#0A192F] hover:scale-[110%] border-white border-4 hover:from-white hover:to-white"
                            >
                                <span className="text-white text-lg lg:text-[28px] text-center font-bold px-8 lg:px-16 lg:py-3 py-2 tracking-wide group-hover:text-[#002A5E]">
                                    Secure Your Spot Now!
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Divisions;

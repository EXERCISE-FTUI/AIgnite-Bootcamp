import { useState, useEffect } from "react";
import Image from "next/image";

const Timeline = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1020);
    };

    useEffect(() => {
        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize); // Check on resize

        return () => {
            window.removeEventListener("resize", handleResize); // Cleanup
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center lg:px-36 text-white gap-16 pb-32">
            <h2 className="lg:text-6xl text-4xl lg:px-0 px-8 text-center tracking-tight">
                Bootcamp{" "}
                <span className="font-bold lg:text-7xl text-5xl">Timeline</span>
            </h2>

            <Image
                src="/timeline-desktop.png"
                alt="Timeline"
                width={3000}
                height={3000}
                className="w-full hidden lg:block"
            />

            <Image
                src="/timeline-mobile.png"
                alt="Timeline"
                width={1000}
                height={2000}
                className="w-full block lg:hidden p-2"
            />
        </div>
    );
};

export default Timeline;

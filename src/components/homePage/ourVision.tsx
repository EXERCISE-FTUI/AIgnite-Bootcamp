import { motion } from "framer-motion";

const OurVision = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-150px" }}
            className="w-full max-w-6xl mx-auto lg:mx-auto mb-40 lg:mb-44 mt-10 lg:p-0 p-8"
        >
            <h1 className="text-7xl text-center font-normal tracking-tighter text-white max-md:text-5xl mb-8 max-md:mb-5 ">
                What will we <span className="font-black text-8xl">Do?</span>
            </h1>
            <div className="w-full h-auto p-4 text-center bg-gradient-to-r from-blue_2 to-purple_4">
                <p className="text-white_1 text-md lg:text-2xl font-extralight">
                    In the AIgnite (is called ‘egg-nite’) bootcamp program,
                    you’ll not only develop industry-relevant skills using AI
                    but also learn to{" "}
                    <span className="font-bold">
                        integrate AI into your very first tech-based project!
                    </span>{" "}
                    Perform well in the bootcamp, and you’ll have the chance to
                    secure an{" "}
                    <span className="font-bold">
                        internship opportunity at EXERCISE FTUI!
                    </span>{" "}
                </p>
            </div>
        </motion.div>
    );
};

export default OurVision;

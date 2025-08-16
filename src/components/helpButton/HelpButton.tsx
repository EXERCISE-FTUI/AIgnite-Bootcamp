"use client";

import {HeadsetIcon} from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import {useEffect, useState} from "react";
import Image from "next/image";

const HelpButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [isMobile, setIsMobile] = useState(false);

	// Check if mobile on mount and window resize
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const {scrollY} = useScroll();
	const [isHidden, setHidden] = useState(true);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous ? latest > previous : false) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	return (
		<motion.div
			variants={{
				visible: {opacity: 1, y: 0},
				hidden: {opacity: 0, y: "-150%"},
			}}
			animate={isHidden ? "hidden" : "visible"}
			transition={{
				ease: "easeInOut",
				duration: 0.3,
			}}
		>
			<motion.div
				className="fixed min-w-16 h-16 cursor-default z-50 bottom-5 rounded-full right-5 shadow"
				transition={{
					scale: {
						delay: 0,
						duration: 1,
						type: "spring",
						bounce: 0.75,
					},
					borderRadius: {
						delay: 0,
						duration: 0,
					},
					duration: 0.5,
					type: "spring",
					bounce: 0.6,
				}}
				whileHover={{
					scale: 1.01,
					// paddingLeft: "0.5rem",
					// paddingRight: "0.5rem",
					borderRadius: "1.5rem",
				}}
				onHoverStart={() => !isMobile && setIsOpen(true)}
				onHoverEnd={() => !isMobile && setIsOpen(false)}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div
					className={`relative h-full flex p-4 gap-2 items-center justify-start ${
						isOpen ? "w-auto rounded-3xl" : "w-16 rounded-full"
					}`}
					style={{
						background:
							"linear-gradient(90deg, #383F96 0%, #55457E 100%)",
						boxShadow: "0px 1px 12px rgba(250, 250, 250, 0.25)",
					}}
				>
					<motion.p
						className={`font-bold text-white tracking-wider text-lg ${
							isOpen ? "block" : "hidden"
						}`}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 20,
							duration: 1,
							delay: 0.1,
						}}
						animate={{
							x: isOpen ? 0 : 50,
							opacity: isOpen ? 1 : 0,
						}}
					>
						Need Help?
					</motion.p>
					<AnimatePresence>
						{isOpen && (
							<motion.div
								className="absolute h-auto pb-20 gap-2 flex flex-col p-4 bottom-0 w-full z-[-1] rounded-3xl left-0"
								initial={{scaleY: 0, opacity: 0}}
								animate={{
									scaleY: 1,
									opacity: 1,
								}}
								exit={{
									scaleY: 0,
									opacity: 0,
								}}
								transition={{
									type: "spring",
									stiffness: 200,
									damping: 20,
									duration: 0.5, // Smooth exit transition
								}}
								style={{
									transformOrigin: "bottom",
									background:
										"linear-gradient(90deg, #383F96 0%, #55457E 100%)",
								}}
							>
								<ContactList
									name="Tian"
									number="+6282113383767"
								/>
								<ContactList
									name="Kiara"
									number="+6281280352747"
								/>
							</motion.div>
						)}
					</AnimatePresence>
					<HeadsetIcon className="text-white w-auto h-full" />
				</div>
			</motion.div>
		</motion.div>
	);
};

interface ContactListProps {
	name: string;
	number: string;
}

const ContactList = ({name, number}: ContactListProps) => {
	return (
		<a
			className="flex items-center gap-2 w-full justify-between cursor-pointer"
			href={`https://wa.me/${number}`}
			target="_blank"
			rel="noreferrer"
		>
			<div className="text-right w-full truncate">
				<p className="font-bold text-white">{name}</p>
				<p className="text-white tracking-tighter text-sm truncate hover:underline">
					{number}
				</p>
			</div>
			<Image src='/Whatsapp.svg' alt="WhatsApp" width={30} height={30} />
		</a>
	);
};

export default HelpButton;

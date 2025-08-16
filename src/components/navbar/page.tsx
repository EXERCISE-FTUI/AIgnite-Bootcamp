"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Menu} from "lucide-react";
import {useMotionValueEvent, useScroll, motion} from "framer-motion";
import {handleLogout} from "@/app/hooks/useLogOut";

interface NavbarProps {
	isLoggedIn: boolean;
}

const Navbar = ({isLoggedIn}: NavbarProps) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		setIsFirstRender(false);
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const mainPageNavbarText = [
		{
			title: "About Us",
			href: "#aboutUs",
		},
		{
			title: "Divisions",
			href: "#divisions",
		},
		{
			title: "Download Booklet",
			href: "#download",
		},
	];

	const navbarText = [
		{
			title: "Download Booklet",
			href: "#download",
		},
	];

	const {scrollY} = useScroll();
	const [isHidden, setHidden] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious();
		if (previous ? latest > previous : false) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	useEffect(() => {
		let scrollTimer: NodeJS.Timeout;

		const handleScroll = () => {
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(() => {
				setHidden(false);
			}, 1500);
		};

		window?.addEventListener("scroll", handleScroll);
		return () => {
			window?.removeEventListener("scroll", handleScroll);
			clearTimeout(scrollTimer);
		};
	}, []);

	return (
		<div className="fixed z-[100] w-full px-4 py-3 lg:py-8 lg:px-16">
			{/* Navbar for larger screens */}
			<motion.div
				className="hidden lg:flex justify-center w-full items-center"
				initial={{opacity: 0, y: isFirstRender ? -50 : 0}}
				variants={{
					visible: {opacity: 1, y: 0},
					hidden: {opacity: 0, y: "-150%"},
				}}
				animate={isHidden ? "hidden" : "visible"}
				transition={{
					duration: isFirstRender ? 0.8 : 0.3,
					ease: isFirstRender ? "easeOut" : "easeInOut",
					delay: isFirstRender ? 1.5 : 0,
				}}
			>
				<div
					className="px-16 py-5 h-auto flex justify-between rounded-xl backdrop-blur-md shadow-lg w-full items-center"
					style={{
						background:
							"linear-gradient(89.92deg, #383F96 -30.15%, #15394A 30.04%, #3A698C 66.29%, #55457E 120.87%, #504B80 120.88%)",
						boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.25)",
					}}
				>
					<div className="w-auto">
						<Link href="/">
							<Image
								src="/Exer-light.png"
								alt="logo"
								className="w-32 aspect-contain"
								width={128}
								height={128}
							/>
						</Link>
					</div>
					<div className="w-auto flex justify-end space-x-8 items-center">
						{window?.location.pathname === "/"
							? mainPageNavbarText.map((item, index) => (
									<a
										key={index}
										href={item.href}
										className="text-white tracking-wider text-xl hover:underline"
									>
										{item.title}
									</a>
							  ))
							: navbarText.map((item, index) => (
									<a
										key={index}
										href={item.href}
										className="text-white tracking-wider text-xl hover:underline"
									>
										{item.title}
									</a>
							  ))}

						{isLoggedIn && (
							<button
								className="text-white tracking-wider text-xl hover:underline"
								onClick={handleLogout}
							>
								Log Out
							</button>
						)}

						{!isLoggedIn ? (
							<Link
								href="/auth/login"
								className="text-[#15394A] text-xl font-bold bg-white rounded-full px-6 tracking-wider py-1 hover:bg-gray-50"
							>
								Login
							</Link>
						) : (
							<Link
								href="/dashboard"
								className="text-[#15394A] text-xl font-bold bg-white rounded-full px-6 tracking-wider py-1 hover:bg-gray-50"
							>
								Dashboard
							</Link>
						)}
					</div>
				</div>
			</motion.div>

			{/* Navbar for mobile screens */}
			<motion.div
				className="lg:hidden flex flex-col h-auto relative items-start w-full"
				initial={{opacity: 0, y: isFirstRender ? -50 : 0}}
				variants={{
					visible: {opacity: 1, y: 0},
					hidden: {opacity: 0, y: "-150%"},
				}}
				animate={isHidden ? "hidden" : "visible"}
				transition={{
					duration: isFirstRender ? 0.8 : 0.3,
					ease: isFirstRender ? "easeOut" : "easeInOut",
					delay: isFirstRender ? 1.5 : 0,
				}}
			>
				<div
					className={`w-full py-3 flex justify-between items-center px-6 ${
						isMobileMenuOpen ? "rounded-t-xl" : "rounded-xl"
					}`}
					style={{
						background:
							"linear-gradient(98.41deg, #383F96 -6.59%, #0D2734 33.69%, #2B7696 57.86%, #55457E 94.11%, #504B80 94.11%)",
					}}
				>
					<Link href="/">
						<Image
							src="/dteExer.svg"
							alt="logo"
							className="h-auto aspect-contain"
							width={128}
							height={128}
						/>
					</Link>

					{/* <div
						className="w-10 h-10 bg-[#15394a]/0 rounded flex flex-col justify-center items-center gap-1.5 cursor-pointer"
						onClick={toggleMobileMenu}
					>
						<div className="w-6 h-0.5 bg-white" />
						<div className="w-6 h-0.5 bg-white" />
						<div className="w-6 h-0.5 bg-white" />
					</div> */}

					<Menu size={40} color="white" onClick={toggleMobileMenu} />
				</div>

				{/* Dropdown menu */}
				{isMobileMenuOpen && (
					<div
						className="w-full absolute top-[99%] rounded-b-xl shadow-lg flex flex-col space-y-3 px-5 pt-4 pb-8"
						style={{
							background:
								"linear-gradient(104.19deg, #383F96 -9.53%, #0D2734 24.8%, #2B7696 59.91%, #55457E 74.98%, #504B80 74.98%)",
						}}
					>
						{window?.location.pathname === "/"
							? mainPageNavbarText.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className="text-white tracking-wide"
									>
										{item.title}
									</Link>
							  ))
							: navbarText.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className="text-white tracking-wide"
									>
										{item.title}
									</Link>
							  ))}

						{!isLoggedIn ? (
							<Link
								href="/auth/login"
								className="text-[#15394A] w-fit font-bold bg-white rounded-full px-10 shadow-sm shadow-white py-2"
							>
								Login
							</Link>
						) : (
							<>
								<button
									className="text-white tracking-wider text-start"
									onClick={handleLogout}
								>
									Log Out
								</button>

								<Link
									href="/dashboard"
									className="text-[#15394A] w-fit font-bold bg-white rounded-full px-10 shadow-sm shadow-white py-2"
								>
									Dashboard
								</Link>
							</>
						)}
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default Navbar;

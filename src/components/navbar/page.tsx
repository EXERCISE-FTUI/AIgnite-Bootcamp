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
	const [, setIsDesktop] = useState(false);
	const [isHomePage, setIsHomePage] = useState(false);

	useEffect(() => {
		setIsFirstRender(false);

		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 1024);
		};

		// Set initial values
		handleResize();
		setIsHomePage(window.location.pathname === "/");

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
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
			<motion.div
				className="flex flex-col lg:justify-center w-full items-start lg:items-center h-auto relative"
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
					className={`w-full flex justify-between items-center px-6 lg:px-16 py-3 lg:py-5 ${
						isMobileMenuOpen ? "rounded-t-xl" : "rounded-xl"
					} lg:rounded-xl lg:backdrop-blur-md lg:shadow-lg bg-white`}
				>
					{/* Logo */}
					<Link href="/">
						<Image
							src="/headerExer.svg"
							alt="logo"
							className="h-auto aspect-contain lg:w-32"
							width={128}
							height={128}
						/>
					</Link>

					{/* Desktop navigation links */}
					<div className="hidden lg:flex w-auto justify-end text-blue_3 space-x-8 items-center">
						{isHomePage
							? mainPageNavbarText.map((item, index) => (
									<a
										key={index}
										href={item.href}
										className="tracking-wider text-xl hover:underline"
									>
										{item.title}
									</a>
							  ))
							: navbarText.map((item, index) => (
									<a
										key={index}
										href={item.href}
										className="tracking-wider text-xl hover:underline"
									>
										{item.title}
									</a>
							  ))}

						{isLoggedIn && (
							<button
								className="tracking-wider text-xl hover:underline"
								onClick={handleLogout}
							>
								Log Out
							</button>
						)}

						{!isLoggedIn ? (
							<Link
								href="/auth/login"
								className="text-white text-xl font-bold bg-blue_3 rounded-full px-6 tracking-wider py-1 hover:bg-blue_3/80"
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

					{/* Mobile menu button */}
					<div className="lg:hidden">
						<Menu
							size={40}
							color="#15394A"
							onClick={toggleMobileMenu}
						/>
					</div>
				</div>

				{/* Mobile dropdown menu */}
				{isMobileMenuOpen && (
					<div className="lg:hidden w-full absolute top-[99%] rounded-b-xl shadow-lg flex flex-col space-y-3 px-5 pt-4 pb-8 bg-white text-blue_3">
						{isHomePage
							? mainPageNavbarText.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className="tracking-wide"
									>
										{item.title}
									</Link>
							  ))
							: navbarText.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className="tracking-wide"
									>
										{item.title}
									</Link>
							  ))}

						{!isLoggedIn ? (
							<Link
								href="/auth/login"
								className="text-white w-fit font-bold bg-blue_3 rounded-full px-10 shadow-sm shadow-white py-2"
							>
								Login
							</Link>
						) : (
							<>
								<button
									className="text-blue_3 tracking-wider text-start"
									onClick={handleLogout}
								>
									Log Out
								</button>

								<Link
									href="/dashboard"
									className="text-white w-fit font-bold bg-blue_3 rounded-full px-10 shadow-sm shadow-white py-2"
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

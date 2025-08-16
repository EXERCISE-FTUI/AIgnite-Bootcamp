"use client";

import {useEffect, useRef} from "react";

export const useScrollAnimation = () => {
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const path = pathRef.current;
		if (!path) return;

		const pathLength = path.getTotalLength();

		// Initial styles
		path.style.strokeDasharray = `${pathLength} ${pathLength}`;
		path.style.strokeDashoffset = pathLength.toString();

		const handleScroll = () => {
			const scrollPercentage =
				(document.documentElement.scrollTop + document.body.scrollTop) /
				(document.documentElement.scrollHeight -
					document.documentElement.clientHeight);

			const drawLength = pathLength * scrollPercentage;
			path.style.strokeDashoffset = (pathLength - drawLength).toString();
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return pathRef;
};

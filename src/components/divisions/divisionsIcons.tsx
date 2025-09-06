export const divisionIcons: Array<{
	src: string;
	selectedSrc: string;
	alt: string;
	id: string;
}> = [

	{
		src: '/div_logo/palette.svg',
		selectedSrc: '/div_logo/selected/palette.svg',
		alt: "Palette Icon",
		id: "palette",
	},
	{
		src: '/div_logo/laptop.svg',
		selectedSrc: '/div_logo/selected/laptop.svg',
		alt: "Laptop Icon",
		id: "laptop",
	},
	{
		src: '/div_logo/cpu.svg',
		selectedSrc: '/div_logo/selected/cpu.svg',
		alt: "CPU Icon",
		id: "cpu",
	},
] as const;

import Footer from "@/components/footer/page";
import "./globals.css";
import Navbar from "@/components/navbar/page";
import {Inter} from "next/font/google";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({
	weight: "700",
	subsets: ["latin"],
});

import HelpButton from "@/components/helpButton/HelpButton";
import {createClient} from "@/utils/supabase/server";

export async function checkUser() {
	const supabase = createClient();
	const {data} = await (await supabase).auth.getUser();

	return data;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = await checkUser();

	return (
		<html lang="en">
			<body>
				<Navbar isLoggedIn={data.user ? true : false} />
				<div
					className={`${inter.className} bg-white_2 overflow-x-hidden pt-28 lg:pt-12`}
				>
					{children}
					<Toaster />
					<div className="pb-16" />
					<Footer />
					<HelpButton />
				</div>
			</body>
		</html>
	);
}

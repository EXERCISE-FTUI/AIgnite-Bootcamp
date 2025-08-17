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
					className={`${inter.className} overflow-x-hidden pt-28 lg:pt-12`}
					style={{
						background:
							"linear-gradient(180deg, #121212 0%, #1F225B 20.22%, #35386D 39.59%, #2B7696 55.12%, #1C465C 69.89%, #15394A 85.23%, #0D2734 100%",
					}}
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

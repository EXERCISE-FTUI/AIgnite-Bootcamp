import { redirect } from "next/navigation";

export default async function RootLayout() {
    redirect("/dashboard");
}

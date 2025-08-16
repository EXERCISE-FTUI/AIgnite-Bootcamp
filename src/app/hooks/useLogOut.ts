"use client";

export const handleLogout = async () => {
	try {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
		});

		const data = await response.json();

		if (data.error) {
			console.error("Error:", data.error);
		} else {
			window.location.href = "/";
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

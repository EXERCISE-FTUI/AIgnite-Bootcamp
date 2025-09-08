"use client";
import CountdownTimer from "@/components/countdownTimer/page";
import Timeline from "@/components/timeline/page";
import Divisions from "@/components/divisions/page";
import DefineExer from "@/components/homePage/defineExer";
import OurVision from "@/components/homePage/ourVision";
import HomePageExer from "@/components/homePage/homePage";

const HomePage = () => {
    // /*
    // useEffect(() => {
    //   const checkUser = async () => {
    //     const { data } = await supabase.auth.getUser();
    //     setUser(data.user); // Set user if logged in
    //   };

    //   checkUser();
    // }, []);

    // const handleLogout = async () => {
    //   const { error } = await supabase.auth.signOut();
    //   if (!error) {
    //     setUser(null); // Clear user state
    //     alert("You have logged out successfully!");
    //   } else {
    //     alert("Failed to log out: " + error.message);
    //   }
    // };
    //  */

    return (
        <div>
            <HomePageExer />
            <CountdownTimer />
            <DefineExer />
            <OurVision />
            <Divisions />
            <Timeline />
        </div>
    );
};

export default HomePage;

import { useEffect, useState } from "react"
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";

// components/UsernameForm.js

// ... (existing imports)

export default function UsernameForm(){
    const {userInfo,status} = useUserInfo(""); // Removed the "" from useUserInfo("")
    const[username,setUsername]=useState("");
    const router = useRouter();
    console.log(userInfo)

    useEffect(() => {
        if (status !== "loaded" || !userInfo?.email) return; // Added !userInfo?.email for robustness

        // Only try to set username if it's not already set and userInfo.email exists
        if (!username) { // Removed the redundant && userInfo?.email check here as it's above
            const defaultUsername = userInfo.email.split("@")[0];
            if (defaultUsername) {
                setUsername(defaultUsername.replace(/[^a-zA-Z0-9]/gi, ""));
            }
        }
    }, [status, userInfo]);


    async function handleSubmit(e){
        e.preventDefault();

        // --- THE FIX STARTS HERE ---
        if (status !== "loaded" || !userInfo ) {
            console.error("User info not loaded or ID missing. Cannot submit form.");
            // Optionally, show a message to the user, prevent submission, or redirect
            return;
        }
        // --- THE FIX ENDS HERE ---

        await fetch('/api/users',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            credentials:"include",
            body:JSON.stringify({
                username,
                id: userInfo.id, // This should now be safe to access
            }),
        });
        // Consider client-side state update instead of full reload for better UX
        // e.g., setUserInfo(prev => ({ ...prev, username: username }));
        window.location.reload();
    }

    // --- Conditional Rendering for the entire component ---
    if (status === "loading") {
        return <div className="flex h-screen items-center justify-center bg-black text-white">Loading user info...</div>;
    }

    if (status === "unauthenticated") {
        router.push('/login'); // Redirect to login or show a login message
        return <div className="flex h-screen items-center justify-center bg-black text-white">Please log in.</div>;
    }

    if (status === "error") {
        return <div className="flex h-screen items-center justify-center bg-black text-white">Error loading user info.</div>;
    }

    // Only render the form if status is loaded and userInfo exists
    


    return(
        <div className="flex h-screen items-center justify-center bg-black">
            <form className="text-center" onSubmit={handleSubmit}>
                <h1 className=" text-2xl text-white font-bold">Pick a username</h1>
                <input className=" block bg-white mt-3 p-2 rounded-full" type="text"
                required placeholder={"username"} value={username} onChange={e=>{setUsername(e.target.value)}}></input>
                <button className="w-full bg-blue-500 mt-2 text-white p-2 rounded-full font-bold">Continue</button>
            </form>
        </div>
    );
}
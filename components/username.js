import { useEffect, useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router"; // ✅ Correct import

export default function UsernameForm() {
    const { userInfo, status } = useUserInfo("");
    const [username, setUsername] = useState("");
    const [sigil,setSigil] = useState("");
    const [name2, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (status !== "loaded" || !userInfo?.user?.email) return;
    
        const defaultUsername = userInfo.user.username;
        if (defaultUsername) {
            setUsername(defaultUsername);
            if (!sigil) setSigil("Baratheon");
            if (!name2) setName("Andal");  // only if not set
        }
    }, [status, userInfo]);
    
    
    

    async function handleSubmit(e) {
        e.preventDefault();

        if (status !== "loaded" || !userInfo) {
            console.error("User info not loaded or ID missing. Cannot submit form.");
            return;
        }

        await fetch("/api/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                
                sigil,
                name2,
            }),
        });

        router.push("/"); // ✅ Correct usage
    }

    if (status === "loading") {
        return <div className="flex h-screen items-center justify-center bg-black text-white">Loading user info...</div>;
    }

    if (status === "unauthenticated") {
        router.push("/login");
        return <div className="flex h-screen items-center justify-center bg-black text-white">Please log in.</div>;
    }

    if (status === "error") {
        return <div className="flex h-screen items-center justify-center bg-black text-white">Error loading user info.</div>;
    }

    return (
        <div style={{backgroundColor:"#000000"}} className="flex border-2  mx-auto h-200 justify-center bg-black border-white p-30 w-120 mt-50 rounded  ">
            <form className="" onSubmit={handleSubmit}>
    <h1 className="text-xl text-gray-400 font-bold"><span className="text-3xl text-yellow-500">Help us keep your account safe.</span><br></br> <br>
    </br>Verify your identity by entering your username</h1>

    <input
        className="block text-yellow-400 mt-3 w-90 rounded text-xl bg-gray-900  focus:ring-blue-100   px-7 py-2 mt-6"
        type="text"
        required
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
    />
   <p className="text-gray-400 mt-5 text-xl font-bold">How can we call you ?</p>
        <input
        className="block text-yellow-400  w-90 rounded text-xl bg-gray-900  focus:ring-blue-100   px-7 py-2 mt-6"
        type="text"
        required
        placeholder="Name"
        value={name2}
        onChange={(e) => setName(e.target.value)} >
        
        </input>


    <h1 className="text-xl text-gray-400 font-bold mt-10 ">Choose your house</h1>
    <select
        className="block bg-yellow-500 mt-7  mb-5 ml-14 rounded-full text-center text-2xl"
        required
        value={sigil}
        onChange={(e) => setSigil(e.target.value)}
    >
       
        <option className="text-center" value="Baratheon">Baratheon 🦌</option>
        <option className="text-center" value="Stark">Stark 🐺</option>
        <option className="text-center" value="Targaryen">Targaryen 🐉</option>
        <option className="text-center" value="Lannister">Lannister 🦁</option>
        <option className="text-center" value="Tyrell">Tyrell 🏵️</option>
        <option className="text-center" value="Martell">Martell 🗡️</option>
        <option className="text-center" value="Greyjoy">Greyjoy 🦑</option>
        <option className="text-center" value="Tully">Tully 🐟</option>
    </select>




    <a href="/" className="text-blue-500 text-lg mt-2 block mt-20">Why am i being asked for this information?</a> 



    <button className="flex justify-center ml-23 w-40 bg-yellow-500 mt-10 text-black p-2 rounded-full font-bold">
        Continue
    </button>
</form>

        </div>
    );
}

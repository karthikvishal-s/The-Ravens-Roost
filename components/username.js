import { useEffect, useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router"; // ✅ Correct import

export default function UsernameForm() {
    const { userInfo, status } = useUserInfo("");
    const [username, setUsername] = useState("");
    const [sigil,setSigil] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (status !== "loaded" || !userInfo?.user?.email) return;
    
        const defaultUsername = userInfo.user.username;
        if (defaultUsername) {
            setUsername(defaultUsername);
            if (!sigil) setSigil("Baratheon"); // only if not set
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
                id: userInfo.id,
                sigil,
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
        <div className="flex h-screen items-center justify-center bg-black">
            <form className="text-center" onSubmit={handleSubmit}>
    <h1 className="text-2xl text-white font-bold">Pick a username</h1>

    <input
        className="block bg-yellow-400 mt-3 p-2 rounded-full text-2xl"
        type="text"
        required
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
    />
    <h1 className="text-2xl text-white font-bold mt-10">Pick a Sigil</h1>
    <select
        className="block bg-yellow-500 mt-3 p-3 mb-10 ml-14 rounded-full text-center text-2xl"
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

    <button className="w-full bg-blue-500 mt-2 text-white p-2 rounded-full font-bold">
        Continue
    </button>
</form>

        </div>
    );
}

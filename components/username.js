import { useEffect, useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router"; // ✅ Correct import

export default function UsernameForm() {
    const { userInfo, status } = useUserInfo("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (status !== "loaded" || !userInfo?.email) return;

        if (!username) {
            const defaultUsername = userInfo.email.split("@")[0];
            if (defaultUsername) {
                setUsername(defaultUsername.replace(/[^a-zA-Z0-9]/gi, ""));
            }
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
                    className="block bg-white mt-3 p-2 rounded-full"
                    type="text"
                    required
                    placeholder={"username"}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <button className="w-full bg-blue-500 mt-2 text-white p-2 rounded-full font-bold">Continue</button>
            </form>
        </div>
    );
}

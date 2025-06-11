import { useEffect, useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";
import Spinner from "./spinner";

export default function UsernameForm(profile = false) {
  const { userInfo, status } = useUserInfo("");
  const [username, setUsername] = useState("");
  const [sigil, setSigil] = useState("");
  const [name2, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status !== "loaded" || !userInfo?.user?.email) return;

    const defaultUsername = userInfo.user.username;
    const defaultSigil = userInfo.user.sigil;
    if (defaultUsername) {
      setUsername(defaultUsername);
      setSigil(defaultSigil || "Stark");
      setName(userInfo.user.name2 || "");
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
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, sigil, name2 }),
    });

    router.push("/");
  }

  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated") {
    router.push("/login");
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Please log in.
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Error loading user info.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      <form
        className="w-full max-w-[500px] border-2 border-white p-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-gray-400 font-bold">
          <span className="text-3xl text-yellow-500">Help us keep your account safe.</span>
          <br />
          <br />
          Verify your identity by entering your username
        </h1>

        <input
          className="block w-full mt-6 rounded bg-gray-900 text-yellow-400 text-lg px-6 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          type="text"
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p className="text-gray-400 mt-5 text-lg font-bold">How can we call you?</p>
        <input
          className="block w-full mt-3 rounded bg-gray-900 text-yellow-400 text-lg px-6 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          type="text"
          required
          placeholder="Name"
          value={name2}
          onChange={(e) => setName(e.target.value)}
        />

        <h1 className="text-xl text-gray-400 font-bold mt-10">Choose your house</h1>
        <select
          className="w-full mt-4 mb-5 rounded-full text-center text-xl bg-yellow-500 py-2"
          required
          value={sigil}
          onChange={(e) => setSigil(e.target.value)}
        >
          <option value="Baratheon">Baratheon 🦌</option>
          <option value="Stark">Stark 🐺</option>
          <option value="Targaryen">Targaryen 🐉</option>
          <option value="Lannister">Lannister 🦁</option>
          <option value="Tyrell">Tyrell 🏵️</option>
          <option value="Martell">Martell 🗡️</option>
          <option value="Greyjoy">Greyjoy 🦑</option>
          <option value="Tully">Tully 🐟</option>
          <option value="Arryn">Arryn 🐦</option>
          <option value="Tarth">Tarth 🏰</option>
          <option value="Snow">Snow ❄️</option>
        </select>


        <button
          type="submit"
          className="w-full mt-8 bg-yellow-500 text-black font-bold py-2 rounded-full hover:bg-yellow-400"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

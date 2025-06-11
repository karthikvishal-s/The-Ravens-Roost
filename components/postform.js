import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";
import axios from "axios";
import Avatar from "./avatar";

export default function Postform({ onPost, compact, placeholder, parent }) {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");

  const btn = "Comment";
  const ph = placeholder || "Share your thought to the Realm...";

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post("/api/posts", {
      text,
      parent,
    });
    setText("");
    if (onPost) {
      onPost();
    }
  }

  if (status === "Loading") return null;

  return (
    <form onSubmit={handlePostSubmit} className="w-full mt-5">
      {compact ? (
        <div className="flex items-start sm:items-center gap-4 px-2 sm:px-6">
          <Avatar src={userInfo?.user?.image} />
          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-3">
            <textarea
              className="flex-grow bg-gray-900 text-white rounded-lg px-4 py-2 text-base w-full sm:w-80 resize-none"
              placeholder={ph}
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold rounded-full px-4 py-2 hover:bg-yellow-300 transition-all"
            >
              {btn}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-20 flex items-start gap-4 px-4 sm:px-10">
            <Avatar src={userInfo?.user?.image} />
            <textarea
              className="flex-grow text-white rounded-lg px-4 py-3 text-lg resize-none w-full "
              placeholder={ph}
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex justify-end px-4 sm:px-10 mt-4">
            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold rounded-full px-6 py-2 hover:bg-yellow-300 flex items-center gap-2"
            >
              Send a Raven
              <img src="/raven.png" alt="Raven" className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </form>
  );
}

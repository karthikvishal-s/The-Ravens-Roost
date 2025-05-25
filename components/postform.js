
import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";
import axios from "axios";
import Avatar from "./avatar";


export default function Postform({onPost}){
    const { userInfo, status} = useUserInfo();
    const [text,setText] = useState("");

  async function handlePostSubmit(e){
    e.preventDefault();
    await axios.post('api/posts', {
      text,
    })
    setText("");
    if(onPost){
      onPost();
    }
  
  }

  if (status === "Loading"){
    return " ";
  }
console.log("User Info:", userInfo);
    return (
        <form onSubmit={handlePostSubmit} >
          <div className="flex">
            <Avatar src={userInfo?.user?.image} />
            <div className="justify-center items-center flex-1">
              <textarea className="w-100 h-10 
               ml-4 mb-3 mt-6 rounded-lg mt-2 rounded-lg text-xl" placeholder="Share your thoughts?"
               value={text} onChange={(e)=> setText(e.target.value)}
               ></textarea>
            </div>
          </div>
          <div className="ml-8 border-t border-gray-500 w-110">
            <button className="bg-blue-500  text-white p-2 rounded-full font-bold w-20 mt-4 ml-90 mb-5">
              Zing
            </button>
          </div>
      </form>
    );
}
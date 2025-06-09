
import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";
import axios from "axios";
import Avatar from "./avatar";


export default function Postform({onPost,compact,placeholder,parent}){
    const { userInfo, status} = useUserInfo();
    const [text,setText] = useState("");

    const btn= "Comment"
    const ph = "Comment on this post..."

  async function handlePostSubmit(e){
    e.preventDefault();
    await axios.post('/api/posts', {
      text,parent
    })
    setText("");
    if(onPost){
      onPost();
    }
  
  }

  if (status === "Loading"){
    return " ";
  }

    return (
        <form onSubmit={handlePostSubmit}  className="mt-5 ">
          {compact?(
            <div className="flex items-center justify-center mt-10 mb-5">
            <div className="flex">
            <Avatar src={userInfo?.user?.image} />
            <div className="justify-center items-center flex">
              <textarea className="w-80 h-15 p-4 
                   ml-10 rounded-lg mt-2 rounded-lg text-xl text-white " placeholder={compact?ph:"Share your thought to the Realm..."}
               value={text} required onChange={(e)=> setText(e.target.value)}
               ></textarea>
            </div>
            <button className=" bg-yellow-400 text-black p-2 rounded-full font-bold w-29 mt-4 ml-0 mb-5 hover:bg-yellow-300 ml-5">
              {compact?btn:"Send a Raven"}
             

            </button>
          </div>

          
          </div>
          ):(<>
          <div className="flex items-center justify-center ">
            <Avatar src={userInfo?.user?.image} />
            <div className="justify-center items-center flex-1">
              <textarea className="w-100 h-20  p-4
               ml-4 mb-3 mt-6 rounded-lg mt-2 rounded-lg text-xl text-white" placeholder={compact?ph:"Share your thought to the Realm..."}
               value={text} required onChange={(e)=> setText(e.target.value)}
               ></textarea>
            </div>
          </div>
          <div className="ml-8 border-t border-gray-500 w-110">
            <button  className="bg-yellow-400 text-black p-2 rounded-full font-bold w-40 mt-4 ml-80 mb-5 hover:bg-yellow-300 cursor-pointer">
              {compact?btn:"Send a Raven"}
              <img src="/raven.png" alt="Raven" className="inline-block w-5 h-5 ml-2" />

            </button>
          </div>
          </>
            
          )}
      </form>
    );
}
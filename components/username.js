import { useEffect, useState } from "react"
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";

export default function UsernameForm(){

const {userInfo,status} = useUserInfo("");
const[username,setUsername]=useState("");
const router = useRouter();


useEffect(() => {
    if (status !== "loaded") return;
  
    if (!username && userInfo?.email) {
      const defaultUsername = userInfo.email.split("@")[0];
      if (defaultUsername) {
        setUsername(defaultUsername.replace(/[^a-zA-Z0-9]/gi, ""));
      }
    }
  }, [status, userInfo]);
  


async function handleSubmit(e){
    e.preventDefault();
    await fetch('/api/users',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify({
            username}),
    });
    window.location.reload();

}

if (status==="loading") return "Loading... Still Fetch not called";

    return(
        <div className="flex h-screen items-center justify-center bg-black">
            <form className="text-center" onSubmit={handleSubmit}>
                <h1 className=" text-2xl text-white font-bold">Pick a username</h1>
                <input className=" block bg-white mt-3 p-2 rounded-full" type="text" 
                required placeholder={"username"} value={username} onChange={e=>{setUsername(e.target.value)}}></input>
                <button className="w-full bg-blue-500 mt-2 text-white p-2 rounded-full font-bold">Continue</button>
            </form>
        </div>
    )
}
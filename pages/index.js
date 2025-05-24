import Postform from "@/components/postform";
import UsernameForm from "@/components/username";
import useUserInfo from "@/hooks/useUserInfo";

import { useSession } from "next-auth/react";


export default function Home() {
  

  const {userInfo,status:UserInfoStatus} = useUserInfo()

if (UserInfoStatus==="loading") return "Loading... user info ";
console.log("userInfo", userInfo);
if (!userInfo?.user?.username){
  return <UsernameForm />;
}


  return (
    <div className=" bg-black text-white max-w-lg mx-auto border-l border-r ">
      <h1 className="text-2xl font-bold p-4">Home</h1>
      <Postform />
    </div>
  )
}

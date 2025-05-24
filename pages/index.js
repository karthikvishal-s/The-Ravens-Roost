import UsernameForm from "@/components/username";
import useUserInfo from "@/hooks/useUserInfo";

import { useSession } from "next-auth/react";


export default function Home() {
  

  const {userInfo,status:UserInfoStatus} = useUserInfo()

if (UserInfoStatus==="loading") return "Loading... user info ";

if (!userInfo?.username){
  return <UsernameForm />;
}
  return (
    <div className="bg-black text-white h-screen">HomePage Logged in {userInfo.username}</div>
  )
}

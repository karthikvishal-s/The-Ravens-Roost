import useUserInfo from "@/hooks/useUserInfo";
import Avatar from "@/components/avatar";
import Cover from "@/components/cover";
import Layout from "@/components/layout";
import BackArrow from "@/components/backArrow";
import Targaryen from "./houses/targaryen";
import Stark from "./houses/stark";
import Link from "next/link";
import Lannister from "./houses/lannister";
import Baratheon from "./houses/barratheon";




export default function Profile() {



    const { userInfo, UserInfoStatus, setUserInfo } = useUserInfo();

console.log("userInfo for  me", userInfo);


var btnclr = " "
var txtclr= " "

if (userInfo?.user?.sigil === "Targaryen") {
    btnclr = "bg-red-600 hover:bg-red-500";
    txtclr = "text-black";}
if (userInfo?.user?.sigil === "Stark") {
    btnclr = "bg-gray-600 hover:bg-gray-500";
    txtclr = "text-white";}
if (userInfo?.user?.sigil === "Lannister") {
    btnclr = "bg-yellow-400 hover:bg-yellow-300";
    txtclr = "text-red-600";}
if (userInfo?.user?.sigil === "Baratheon") {
    btnclr = "bg-yellow-600 hover:bg-yellow-500";
    txtclr = "text-black";}
if (userInfo?.user?.sigil === "Tully") {
    btnclr = "bg-blue-800 hover:bg-blue-500";
    txtclr = "text-red-500";}
if (userInfo?.user?.sigil === "Greyjoy") {
    btnclr = "bg-yellow-600 hover:bg-yellow-500";
    txtclr = "text-red-600";}

    return(
        <Layout>
            <div className="text-white flex mt-5">
            <BackArrow destination="/" />
            <p className="text-2xl font-bold ml-10">
                My Profile
            </p>
            </div>


              
        
              <div className="mt-7">
                <Cover src={`${userInfo?.user?.sigil }.jpg`} />
              </div>
              <div className='relative -top-20 ml-10 '>
                <Avatar src={userInfo?.user?.image} profile />
              </div>
              

              <div className="text-white flex"> 
                <p className="text-3xl ml-9 font-bold ">
                 {userInfo?.name2 || userInfo?.user?.name2}
                </p>
              </div>

              <div className="flex">
              <div className="text-gray-400 flex"> 
                <p className="text-xl ml-9 font-bold mt-3">
                @  {userInfo?.name2 || userInfo?.user?.username}
                </p>
              </div>

              <div>
                <Link href={"/usernamePage"} className={`rounded-full ${btnclr} p-3 text-lg  font-bold  ml-60 ${txtclr}`}>
                Edit Profile
                </Link>
              </div>
              </div>


              <Lannister />
              
            </Layout>
    )
}
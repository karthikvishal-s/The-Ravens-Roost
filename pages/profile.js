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
import Tully from "./houses/tully";

export default function Profile() {
  const { userInfo, UserInfoStatus, setUserInfo } = useUserInfo();
  console.log("userInfo for  me", userInfo);

  let btnclr = "";
  let txtclr = "";

  if (userInfo?.user?.sigil === "Targaryen") {
    btnclr = "bg-red-600 hover:bg-red-500";
    txtclr = "text-black";
  }
  if (userInfo?.user?.sigil === "Stark") {
    btnclr = "bg-gray-600 hover:bg-gray-500";
    txtclr = "text-white";
  }
  if (userInfo?.user?.sigil === "Lannister") {
    btnclr = "bg-yellow-400 hover:bg-yellow-300";
    txtclr = "text-red-600";
  }
  if (userInfo?.user?.sigil === "Baratheon") {
    btnclr = "bg-yellow-600 hover:bg-yellow-500";
    txtclr = "text-black";
  }
  if (userInfo?.user?.sigil === "Tully") {
    btnclr = "bg-blue-800 hover:bg-blue-500";
    txtclr = "text-red-500";
  }
  if (userInfo?.user?.sigil === "Greyjoy") {
    btnclr = "bg-yellow-600 hover:bg-yellow-500";
    txtclr = "text-red-600";
  }

  return (
    <Layout>
      <div className="text-white flex items-center mt-5 px-4 md:px-10">
        <BackArrow destination="/" />
        <p className="text-xl md:text-2xl font-bold ml-4">My Profile</p>
      </div>

      <div className="mt-6">
        <Cover src={`${userInfo?.user?.sigil}.jpg`} />
      </div>

      <div className="relative -top-20 ml-6 md:ml-10">
        <Avatar src={userInfo?.user?.image} profile />
      </div>

      <div className="text-white px-6 md:px-10 -mt-16 md:-mt-10">
        <p className="text-2xl md:text-3xl font-bold">
          {userInfo?.name2 || userInfo?.user?.name2}
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <p className="text-gray-400 text-lg font-bold">@ {userInfo?.name2 || userInfo?.user?.username}</p>

          <Link
            href="/usernamePage"
            className={`mt-3 md:mt-0 w-max rounded-full ${btnclr} px-5 py-2 text-base font-bold ${txtclr}`}
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="mt-6 px-4 md:px-10">
        {userInfo?.user?.sigil === "Targaryen" && <Targaryen />}
        {userInfo?.user?.sigil === "Stark" && <Stark />}
        {userInfo?.user?.sigil === "Baratheon" && <Baratheon />}
        {userInfo?.user?.sigil === "Lannister" && <Lannister />}
        {userInfo?.user?.sigil === "Tully" && <Tully />}
      </div>
    </Layout>
  );
}

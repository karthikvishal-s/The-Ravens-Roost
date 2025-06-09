import Postform from "@/components/postform";
import UsernameForm from "@/components/usernamePage";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import PostContent from "@/components/PostContent";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";
import { FaHome, FaSearch, FaEnvelope, FaBell, FaCog, FaPowerOff } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoIosMore } from "react-icons/io";
import Link from "next/link";

export default function Home() {
  const { userInfo, UserInfoStatus, setUserInfo } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const router = useRouter();


console.log("userInfo", userInfo);

  async function fetchHomePosts() {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data.posts || []);
      setIdsLikedByMe(response.data.idsLikedByMe || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }

  async function logout() {
    await signOut({ callbackUrl: "/login" });
  }



  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (UserInfoStatus === "loading") return <Spinner />;
  //if (!userInfo?.user?.username) return <UsernameForm />;





  

  return (
    <div className="relative min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="fixed  left-0 pt-80 pl-6 pr-6 h-full border-r border-gray-700 flex flex-col gap-8 z-50">
        <SidebarIcon icon={<FaHome />} label="Home" />
        <SidebarIcon icon={<FaSearch />} label="Explore" />
        <SidebarIcon icon={<FaEnvelope />} label="Messages" />
        <SidebarIcon icon={<FaBell />} label="Notifications" />
        <SidebarIcon icon={<FaCog />} label="Settings" />
        <Link href={"/profile"}>
          <SidebarIcon icon={<GiPlagueDoctorProfile  />} label="Profile" />
        </Link>
        <SidebarIcon icon={<IoIosMore />} label="More" />
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0  pr-15 z-50 -top-10 ">
        <FaPowerOff
          className="text-3xl hover:text-yellow-400 cursor-pointer mt-20"
          title="Logout"
          onClick={() => router.push("/logoutsurity")}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow pl-32 pr-32 mt-10 w-full max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold p-4 text-yellow-500 text-center">Feed</h1>

        <div className="flex justify-center mb-10">
          <Postform onPost={fetchHomePosts} />
        </div>

        <Layout>
          <div>
            {posts.length > 0 &&
              posts.map((post) => (
                <div key={post._id} className="border border-gray-500 p-5 font-bold w-full">
                  <PostContent
                    {...post}
                    likedByMe={idsLikedByMe.includes(post._id)}
                    refreshPosts={fetchHomePosts}
                  />
                </div>
              ))}
          </div>

          <div className="flex items-center justify-center mt-10">
            <button
              className="bg-red-500 px-5 py-2 rounded-full text-white text-xl"
              onClick={logout}
            >
              Logout
            </button>
          </div>

          <div className="flex items-center justify-center mt-10">
            <button
              className="bg-blue-500 px-5 py-2 rounded-full text-white text-xl"
              onClick={() => router.push("/usernamePage")}
            >
              Username Page
            </button>
          </div>
        </Layout>
      </div>
    </div>
  );
}

function SidebarIcon({ icon, label }) {
  return (
    <div className="border border-black flex items-center text-4xl p-2 hover:text-yellow-400 cursor-pointer rounded-full  ">
      {icon}
      <span className="ml-4 hidden lg:block text-xl font-bold">{label}</span>
    </div>
  );
}

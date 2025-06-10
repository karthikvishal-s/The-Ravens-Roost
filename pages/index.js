import Postform from "@/components/postform";
import UsernameForm from "@/components/usernamePage";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import PostContent from "@/components/PostContent";
import Layout from "@/components/layout";
import Spinner from "@/components/spinner";
import { useRouter } from "next/router";
import { FaHome, FaSearch, FaEnvelope, FaBell, FaCog, FaPowerOff } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoIosMore } from "react-icons/io";
import Link from "next/link";
import { FaBookBookmark } from "react-icons/fa6";

export default function Home() {
  const { data: session, status } = useSession();
  const { userInfo, loading: userInfoLoading } = useUserInfo(); // Renamed to "loading" for clarity
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const [idsSavedByMe, setIdsSavedByMe] = useState([]);
  const router = useRouter();

  // Fetch posts only if authenticated and userInfo is ready
  useEffect(() => {
    if (status === "authenticated" && userInfo) {
      fetchHomePosts();
    }
  }, [status, userInfo]);

  async function fetchHomePosts() {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data.posts || []);
      setIdsLikedByMe(res.data.idsLikedByMe || []);
      setIdsSavedByMe(res.data.idsSavedByMe || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }

  async function logout() {
    await signOut({ callbackUrl: "/login" });
  }

  if (status === "loading" || userInfoLoading) return <Spinner />;
  if (!userInfo?.user?.username) return <UsernameForm />;

  return (
    <div className="relative min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <aside className="fixed left-0 pt-40 pl-6 pr-6 h-full border-r border-gray-700 flex flex-col gap-8 z-50 font-rocker font-bold ">
        <Link href={'/login'}>
        <SidebarIcon icon={<FaHome />} label="Home" />
        </Link>
        <SidebarIcon icon={<FaSearch />} label="Explore" />
        <SidebarIcon icon={<FaEnvelope />} label="Messages" />
       
        <Link href="/savedposts">
        <SidebarIcon icon={<FaBookBookmark />} label="Scroll Vault" />
        </Link>
        
        <Link href="/profile">
          <SidebarIcon icon={<GiPlagueDoctorProfile />} label="Profile" />
        </Link>
        <SidebarIcon icon={<IoIosMore />} label="More" />
      </aside>

      {/* Right Sidebar - Logout Icon */}
      <div className="fixed right-0 pr-6 z-50 mt-20">
        <FaPowerOff
          className="text-3xl hover:text-yellow-400 cursor-pointer"
          title="Logout"
          onClick={() => router.push("/logoutsurity")}
        />
      </div>

      {/* Main Content */}
      <main className="flex-grow pl-32 pr-32 mt-10 w-full max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold p-4 text-yellow-500 text-center font-ewert">Feed</h1>

        <div className="flex justify-center mb-10">
          <Postform onPost={fetchHomePosts} />
        </div>

        <Layout>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="border border-gray-500 p-5 font-bold w-full">
                <PostContent
                  {...post}
                  likedByMe={idsLikedByMe.includes(post._id)}
                  savedByMe={idsSavedByMe.includes(post._id)}
                  refreshPosts={fetchHomePosts}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-8">No posts yet. Be the first to post!</p>
          )}

          <div className="flex justify-center mt-10 space-x-6">
            <button
              className="bg-red-500 px-6 py-2 rounded-full text-white text-xl"
              onClick={logout}
            >
              Logout
            </button>
            <button
              className="bg-blue-500 px-6 py-2 rounded-full text-white text-xl"
              onClick={() => router.push("/usernamePage")}
            >
              Username Page
            </button>
          </div>
        </Layout>
      </main>
    </div>
  );
}

function SidebarIcon({ icon, label }) {
  return (
    <div className="border border-black flex items-center text-4xl p-2 hover:text-yellow-400 cursor-pointer rounded-full">
      {icon}
      <span className="ml-4 hidden lg:block text-xl font-bold">{label}</span>
    </div>
  );
}

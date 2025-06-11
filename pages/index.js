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
import { FaHome, FaSearch, FaEnvelope, FaPowerOff, FaBars } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoIosMore } from "react-icons/io";
import { FaBookBookmark } from "react-icons/fa6";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const { userInfo, loading: userInfoLoading } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const [idsSavedByMe, setIdsSavedByMe] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();

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

  if (status === "loading" || userInfoLoading) return <Spinner />;
  if (!userInfo?.user?.username) return <UsernameForm />;

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <aside className="hidden md:flex fixed md:left-0 pt-20 md:pt-40 pl-6 pr-6 h-full border-r border-gray-700 flex-col gap-8 z-50 font-rocker font-bold">
        <Link href="/"><SidebarIcon icon={<FaHome />} label="Home" /></Link>
        <SidebarIcon icon={<FaSearch />} label="Explore" />
        <SidebarIcon icon={<FaEnvelope />} label="Messages" />
        <Link href="/savedposts"><SidebarIcon icon={<FaBookBookmark />} label="Scroll Vault" /></Link>
        <Link href="/profile"><SidebarIcon icon={<GiPlagueDoctorProfile />} label="Profile" /></Link>
        <SidebarIcon icon={<IoIosMore />} label="More" />
      </aside>

      {/* Hamburger & Mobile Nav Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <FaBars
          className="text-3xl hover:text-yellow-400 cursor-pointer"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <nav className="md:hidden fixed top-0 left-0 w-2/5 h-full bg-gray-900 border-r border-gray-700 z-40 p-6 flex flex-col gap-6 pt-34 ">
          <Link href="/login" className="text-white" onClick={() => setMobileNavOpen(false)}><SidebarIcon icon={<FaHome />} label="Home" /></Link>
          <SidebarIcon icon={<FaSearch  className="text-gray-500"/>} label="Explore" />
          <SidebarIcon icon={<FaEnvelope  className="text-gray-500" />} label="Messages" />
          <Link href="/savedposts" className="text-white" onClick={() => setMobileNavOpen(false)}><SidebarIcon icon={<FaBookBookmark />} label="Scroll Vault" /></Link>
          <Link href="/profile" className="text-white" onClick={() => setMobileNavOpen(false)}><SidebarIcon icon={<GiPlagueDoctorProfile />} label="Profile" /></Link>
          <SidebarIcon icon={<IoIosMore  className="text-gray-500" />} label="More" />
        </nav>
      )}

      {/* Logout */}
      <div className="fixed md:right-0 right-4 top-4 md:top-20 pr-6 z-50">
        <FaPowerOff
          className="text-2xl md:text-3xl hover:text-yellow-400 cursor-pointer"
          title="Logout"
          onClick={() => router.push("/logoutsurity")}
        />
      </div>

      {/* Main Content */}
      <main className="flex-grow mt-24 md:mt-10 px-4 md:px-32 w-full max-w-5xl mx-auto pb-28">
        <h1 className="text-4xl md:text-6xl font-bold p-4 text-yellow-500 text-center font-ewert">Feed</h1>

        {/* Postform inline as original */}
        <div className="flex justify-center mb-10">
          <Postform onPost={fetchHomePosts} />
        </div>

        {/* Posts */}
        <Layout>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="border border-gray-500 p-4 md:p-5 font-bold w-full mb-4">
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
        </Layout>
      </main>
    </div>
  );
}

function SidebarIcon({ icon, label }) {
  return (
    <div className=" flex items-center gap-3 text-2xl md:text-3xl p-2 px-4 hover:bg-gray-800 hover:text-yellow-400 cursor-pointer rounded-full transition-transform duration-200 transform hover:scale-105">
      {icon}
      <span className="text-base md:text-lg font-semibold">{label}</span>
    </div>
  );
}

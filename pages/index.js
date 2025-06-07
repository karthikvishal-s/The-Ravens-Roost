import Postform from "@/components/postform";
import UsernameForm from "@/components/usernamePage";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import PostContent from "@/components/PostContent";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";

// Icon imports
import { FaHome, FaSearch, FaEnvelope, FaBell, FaCog } from "react-icons/fa";

export default function Home() {
  const { userInfo, UserInfoStatus, setUserInfo } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const router = useRouter();

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
    setUserInfo(null);
    await signOut();
  }

  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (UserInfoStatus === "loading") return <Spinner />;

  if (!userInfo?.user?.username) {
    return <UsernameForm />;
  }

  async function toUsernamePage() {
    router.push("/usernamePage");
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      
      {/* Left Sidebar */}
      <div className="fixed pt-90 left-10 flex flex-col gap-10 text-3xl z-50  border-r-2 pr-10 border-gray-600 h-full">
        <FaHome className="hover:text-yellow-400 cursor-pointer" title="Home" />
        <FaSearch className="hover:text-yellow-400 cursor-pointer" title="Explore" />
        <FaEnvelope className="hover:text-yellow-400 cursor-pointer" title="Messages" />
        <FaBell className="hover:text-yellow-400 cursor-pointer" title="Notifications" />
        <FaCog className="hover:text-yellow-400 cursor-pointer" title="Settings" />
      </div>

      {/* Feed Title */}
      <div className="h-30 text-center mt-10">
        <h1 className="text-4xl font-bold p-4 text-yellow-500">Feed</h1>
      </div>

      {/* Post Form */}
      <div className="w-140 mx-auto items-center justify-center flex mb-20 border-3 pr-9 border-gray-800">
        <Postform onPost={fetchHomePosts} />
      </div>

      {/* Main Layout */}
      <Layout>
        <div className="mx-auto">
          {/* Posts */}
          <div>
            {posts.length > 0 &&
              posts.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-500 p-5 font-bold w-full"
                >
                  <PostContent
                    {...post}
                    likedByMe={idsLikedByMe.includes(post._id)}
                    refreshPosts={fetchHomePosts}
                  />
                </div>
              ))}
          </div>

          {/* Buttons */}
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
              onClick={toUsernamePage}
            >
              Username page
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

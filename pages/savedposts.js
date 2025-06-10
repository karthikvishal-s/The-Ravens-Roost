import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout";
import PostContent from "@/components/PostContent";
import BackArrow from "@/components/backArrow";

export default function SavedPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedPosts() {
      try {
        const response = await axios.get("/api/saved");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedPosts();
  }, []);

  return (
    <Layout>
        <h1 className='w-9 mr-5 mb-10 mt-5'>
                    <BackArrow destination='/'></BackArrow>
                    </h1>
      <div className="text-white max-w-2xl mx-auto mt-10">
        <h1 className="text-5xl font-bold mb-6 text-yellow-500 text-center font-ewert mb-20">
            Vault
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">You haven't saved any posts yet.</p>
        ) : (
          posts.map(post => (
            <div className="border-t border-gray-700 mt-2 " key={post._id}>
              <PostContent key={post._id} {...post} />
              </div>
          ))
        )}
      </div>
    </Layout>
  );
}

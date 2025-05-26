import Postform from "@/components/postform";
import UsernameForm from "@/components/username";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { set } from "mongoose";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import PostContent  from "@/components/PostContent";
import Layout from "@/components/layout";


export default function Home() {
  

const {userInfo,status:UserInfoStatus} = useUserInfo()
const [posts,setPosts] = useState([]);

async function fetchHomePosts() {
  try {
    const response = await axios.get("/api/posts");
    setPosts(response.data.posts || []);  // Safely handle missing posts
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
}


useEffect(() => {
  fetchHomePosts();
}, []);


if (UserInfoStatus==="loading") return "Loading... user info ";

if (!userInfo?.user?.username){
  return <UsernameForm />;
}

  return (
    <Layout>
      <h1 className="text-2xl font-bold p-4 text-3xl text-yellow-500">ThroneFeed</h1>
      <Postform  onPost={()=>{fetchHomePosts();}}/>
      <div className="text-black">
        
        {posts.length>0 && posts.map(post => (
          <div key=
          {post._id} className=" border-t border-gray-500 p-5 font-bold w-110 ml-8">
            <PostContent {...post} />
          </div>
        ))}
            
      </div>
      </Layout>
    
  )
}

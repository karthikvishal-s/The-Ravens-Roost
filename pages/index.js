import Postform from "@/components/postform";
import UsernameForm from "@/components/usernamePage";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { set } from "mongoose";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import PostContent  from "@/components/PostContent";
import Layout from "@/components/layout";
import Router from "next/router";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";


export default function Home() {
  

const {userInfo,UserInfoStatus,setUserInfo} = useUserInfo()
const [posts,setPosts] = useState([]);
const [idsLikedByMe,setIdsLikedByMe] = useState([]);

async function fetchHomePosts() {
  try {
    const response = await axios.get("/api/posts");
    console.log("Fetched posts:", response.data.posts); // Debugging line
    setPosts(response.data.posts || []);  // Safely handle missing posts
    setIdsLikedByMe(response.data.idsLikedByMe); // Safely handle missing idsLikedByMe
  } catch (err) {
    //console.error("Error fetching posts:", err);
  }
}
const router = useRouter();

async function logout(){
   setUserInfo(null); 
  await signOut();

}


useEffect(() => {
  fetchHomePosts();
}, []);


if (UserInfoStatus==="loading") return <Spinner></Spinner>

if (!userInfo?.user?.username){
  return <UsernameForm />;
}

async function toUsernamePage(){
  console.log("Raised request username page")
  router.push('/usernamePage')
  
}


  return (
    <>
    <div className="flex items-center justify-center mt-10">
        <button className="bg-red-500 px-5 py-2 rounded-full text-white text-xl" onClick={logout}>Logout</button>
      </div>
      <div className="flex items-center justify-center mt-10">
        <button className="bg-blue-500 px-5 py-2 rounded-full text-white text-xl" onClick={toUsernamePage}>Username page</button>
      </div>
    <Layout>
      <h1 className="text-2xl font-bold p-4 text-3xl text-yellow-500">Feed</h1>
      <Postform  onPost={()=>{fetchHomePosts();}}/>
      <div className="text-black">
        
        {posts.length>0 && posts.map(post => (
          <div key=
          {post._id} className=" border-t border-gray-500 p-5 font-bold w-110 ml-8">
            <PostContent {...post}  likedByMe={idsLikedByMe.includes(post._id)} refreshPosts={fetchHomePosts}/>
          </div>
        ))}     
      </div>
      <div className="flex items-center justify-center mt-10">
        <button className="bg-red-500 px-5 py-2 rounded-full text-white text-xl" onClick={logout}>Logout</button>
      </div>
      <div className="flex items-center justify-center mt-10">
        <button className="bg-blue-500 px-5 py-2 rounded-full text-white text-xl" onClick={toUsernamePage}>Username page</button>
      </div>
      </Layout>
      
    </>
      
    
  )
}
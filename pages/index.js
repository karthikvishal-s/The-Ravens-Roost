import Postform from "@/components/postform";
import UsernameForm from "@/components/username";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { set } from "mongoose";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import PostContent  from "@/components/PostContent";


export default function Home() {
  

const {userInfo,status:UserInfoStatus} = useUserInfo()
const [posts,setPosts] = useState([]);

async function fetchHomePosts(){

  const response = await axios.get("/api/posts");
console.log("API response:", response.data);
setPosts(response.data);

axios
    .get('/api/posts')
    .then(response =>{setPosts(response.data)})
}

useEffect(() => {
  fetchHomePosts();
}, []);


if (UserInfoStatus==="loading") return "Loading... user info ";

if (!userInfo?.user?.username){
  return <UsernameForm />;
}

  return (
    <div className=" bg-black text-white max-w-lg mx-auto border-l border-r ">
      <h1 className="text-2xl font-bold p-4">Home</h1>
      <Postform  onPost={()=>{fetchHomePosts();}}/>
      <div className="text-white">
        
        {posts.length>0 && posts.map(post => (
          <div key=
          {post._id} className=" border-t border-gray-500 p-5 font-bold w-110 ml-8">
            <PostContent {...post} />
          </div>
        ))}
            
      </div>
    </div>
  )
}

import ReactTimeAgo from "react-time-ago";
import Avatar from "./avatar";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import PostButtons from "./postbuttons";

export default function PostContent({text,author,createdAt,likesCount,likedByMe,_id,big=false,commentsCount}) {
  const date = new Date(createdAt);

// Format: "May 25, 2025"
const formattedDate = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});  

  return(
      <>
        <div className="flex  gap-5 p-4 ">
        {/* Avatar */}
        
        
        <Link href={'/'+author?.username} className="cursor-pointer">
      
          <Avatar src={author?.image} />
    
        </Link>
      
        {/* Post Content */}
        <div className="flex-1">
          {/* Author name and username */}
          <div>
            <div className="flex">
            <Link href={'/'+author?.username}>
            <div className="font-bold text-xl text-yellow-500">{author?.name2 || "Unknown"}</div>
            </Link>
            <Link href={'/'+author?.username}>
            <div className="font-bold text-xl text-yellow-500 ml-2">{author?.sigil || "Unknown"}</div>
            </Link>
            </div>
      
            <Link href={'/'+author?.username}>
            <div className="text-gray-500 text-l">@{author?.username || "anonymous"}
          
                {!big?(<span className="text-gray-500 ml-4"> 
                {createdAt &&(<ReactTimeAgo date={createdAt} timeStyle={'twitter'} />)}</span>):("")}
                </div>
            </Link>
          </div>
      
          {/* Post text */}
          <div>
            {!big?(
            <div className="w-full">
              <Link style={{color:"#fffff0"}} className=" mt-2 text-l" href={`/${author?.username || "Unknown"}/status/${_id}`}>
              <div className="mt-2 mb-2 ml-2">
              {text}
              </div>
            </Link>
            </div>):("")}
          </div>
        </div>
        </div>
        
        {big?(
          <div>
            <p className="text-gray-100 text-xl p-7">
              {text}
            </p>
            <h1 className="text-gray-200 text-l ml-55 text-bold "> 
              <span className="text-gray-400 mr-2">posted on</span>{formattedDate}
            </h1>
          </div>
        ):("")}

        {big?(
          <div>
          <PostButtons id={_id}  likesCount={likesCount} likedByMe={likedByMe} commentsCount={commentsCount}></PostButtons>
        </div>
        ):(
          <div>
          <PostButtons id={_id} likesCount={likesCount} likedByMe={likedByMe} commentsCount={commentsCount}></PostButtons>
        </div>
        )}
        
      
      </>
    )

}
import ReactTimeAgo from "react-time-ago";
import Avatar from "./avatar";
import Link from "next/link";

export default function PostContent({text,author,createdAt,_id}) {
    return(
        <div className="flex items-start gap-4 p-4">
        {/* Avatar */}
        <div>
          <Avatar src={author?.image} />
        </div>
      
        {/* Post Content */}
        <div className="flex-1">
          {/* Author name and username */}
          <div>
            <div className="font-bold text-sm text-white">{author?.name || "Unknown"}</div>
            <div className="text-gray-400 text-xs">@{author?.username || "anonymous"} 
                <span className="text-gray-500 ml-4"> 
                {createdAt &&(<ReactTimeAgo date={createdAt} timeStyle={'twitter'} />)}</span>
                </div>
          </div>
      
          {/* Post text */}
          <Link className="text-gray-200 text-base mt-2" href={`/${author.username}/status/${_id}`}>
            {text}
          </Link>
        </div>
      </div>
      
    )

}
import ReactTimeAgo from "react-time-ago";
import Avatar from "./avatar";
import Link from "next/link";
import PostButtons from "./postbuttons";

export default function PostContent({
  text,
  author,
  createdAt,
  likesCount,
  likedByMe,
  _id,
  big = false,
  commentsCount,
  savedCount,
  savedByMe,
}) {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  console.log("savedByMe", savedByMe);
  return (
    <>
      <div className="flex gap-5 p-4">
        {/* Avatar */}
        <Link href={`/${author?.username || "unknown"}`} className="cursor-pointer">
          <Avatar src={author?.image} />
        </Link>

        {/* Post Content */}
        <div className="flex-1">
          <Link
            href={`/${author?.username || "Unknown"}/status/${_id}`}
            className="block mt-2 text-lg text-[#fffff0] hover:bg-gray-900 transition duration-200 p-2 rounded"
          >
            {/* Author name and username */}
            <div className="flex items-center flex-wrap">
              <Link href={`/${author?.username}`}>
                <span className="font-bold text-xl text-yellow-500">{author?.name2 || "Unknown"}</span>
              </Link>
              <Link href={`/${author?.username}`}>
                <span className="font-bold text-xl text-yellow-500 ml-2">{author?.sigil || "Unknown"}</span>
              </Link>
            </div>

            <div className="text-gray-500 text-base">
              @{author?.username || "anonymous"}
              {!big && createdAt && (
                <span className="ml-4">
                  <ReactTimeAgo date={createdAt} timeStyle="twitter" />
                </span>
              )}
            </div>

            {/* Post text (small view) */}
            {!big && (
              <div className="mt-2 mb-2 ml-2">
                {text}
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Post content for full view */}
      {big && (
        <div className="px-7">
          <p className="text-gray-100 text-xl mb-4">{text}</p>
          <h1 className="text-gray-200 text-base font-semibold">
            <span className="text-gray-400 mr-2">Posted on</span>{formattedDate}
          </h1>
        </div>
      )}

      {/* Post buttons */}
      <div>
        <PostButtons
          id={_id}
          likesCount={likesCount}
          savedCount={savedCount}
          savedByMe={savedByMe} // Assuming savedByMe is not passed to this component
          likedByMe={likedByMe}
          commentsCount={commentsCount}
          author={author}
        />
      </div>
    </>
  );
}

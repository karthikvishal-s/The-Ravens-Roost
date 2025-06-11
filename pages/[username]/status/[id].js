import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import PostContent from '@/components/PostContent';
import Layout from '@/components/layout';
import Link from "next/link";
import useUserInfo from '@/hooks/useUserInfo';
import Postform from '@/components/postform';
import BackArrow from '@/components/backArrow';

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const { userInfo } = useUserInfo();
  const [replies, setReplies] = useState([]);
  const [repliesLikedByMe, setRepliesLikedByMe] = useState([]);

  function fetchData() {
    axios.get('/api/posts?id=' + id)
      .then(response => {
        setPost(response.data.post);
      });
    axios.get('/api/posts?parent=' + id)
      .then(response => {
        setReplies(response.data.posts);
        setRepliesLikedByMe(response.data.idsLikedByMe || []);
      });
  }

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="flex items-center px-4 sm:px-10 mt-5 mb-3">
        <BackArrow destination="/" />
        <h1 className="text-xl sm:text-2xl font-bold text-white ml-4">Realm</h1>
      </div>

      {post && (
        <div className="px-4 sm:px-10">
          <PostContent {...post} big={true} />
        </div>
      )}

      {!!userInfo && (
        <div className="px-4 sm:px-10 mt-4">
          <div className="border border-gray-600 rounded-md p-4">
            <Postform onPost={fetchData} compact parent={id} />
          </div>
        </div>
      )}

      <div className="px-4 sm:px-10 mt-6 border-b border-gray-600 pb-2">
        <h2 className="text-white text-lg sm:text-xl font-bold">Replies</h2>
      </div>

      <div className="px-4 sm:px-10 text-white">
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div
              key={reply._id}
              className="border-b border-gray-600 py-5 font-bold"
            >
              <PostContent
                {...reply}
                likedByMe={repliesLikedByMe.includes(reply._id)}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-400 mt-4">No replies yet.</div>
        )}
      </div>
    </Layout>
  );
}

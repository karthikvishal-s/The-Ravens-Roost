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
    const { id } = router.query
    const [post, setPost] = useState();
    const { userInfo } = useUserInfo();
    const [replies, setReplies] = useState([]);
    const [repliesLikedByMe, setRepliesLikedByMe] = useState([]);

    function  fetchData(){
        axios.get('/api/posts?id=' + id)
            .then(response => {
                setPost(response.data.post);
            });
        axios.get('/api/posts?parent=' + id)
            .then(response => {
                console.log("res.data",response.data)
                setReplies(response.data.posts);
                setRepliesLikedByMe(response.data.idsLikedByMe || []);
            })

    }

    useEffect(() => {
        if (!id) return;

        fetchData()
    }, [id]);

    return (
        <Layout>
            <div className='flex '>
            <BackArrow destination='/'></BackArrow>
            <h1 className='text-2xl text-bold ml-4 mb-5 text-white'>Realm</h1>
            </div>

            {post && (
                <>
                    <PostContent {...post} big={true} />
                    <div>

                    </div>
                </>

            )}
            {!!userInfo && (
                <div className='px-7  border border-gray-600 mt-3'>
                    <Postform onPost={fetchData} compact parent={id} />
                </div>

            )}
            <div className='text-white text-xl font-bold  mt-3 border-b border-gray-600 pb-3'>
                <p className='ml-5'>Replies</p>
            </div>
            <div className='text-white'>
                {replies.length>0 && replies.map(reply => (
                    <div className='border-b border-gray-600 p-5 font-bold ' key={reply._id}>
                        <PostContent {...reply} likedByMe={repliesLikedByMe.includes(reply._id)} />
                    </div>
                ))}
            </div>

        </Layout>

    );
}
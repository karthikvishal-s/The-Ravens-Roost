import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import axios from 'axios';


import PostContent from '@/components/PostContent';
import Layout from '@/components/layout';
import Link from "next/link";


export default function PostPage(){
    const router = useRouter();
    const {id} = router.query
    const [post, setPost] = useState();

    useEffect(() => {
if(!id) return;

        axios.get('/api/posts?id=' + id)
        .then(response => {
            setPost(response.data.post);
        })
    },[id]);


    return (
        <Layout>
            <Link href={'/'} className='flex'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 ml-5 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

               <h1 className='text-2xl text-bold ml-4 mb-5 text-white'>Realm</h1>
            </Link>

            {post && (
                <PostContent {...post} big={true} />
            )}
        </Layout>
    );
}
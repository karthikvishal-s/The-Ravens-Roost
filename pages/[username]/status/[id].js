import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { use } from 'react';
import axios from 'axios';


export default function PostPage(){
    const router = useRouter();
    const {id} = router.query
    const [post, setPost] = useState();

    useEffect(() => {
if(!id) return;

        axios.get('/api/posts?id=}' + id)
        .then(response => {
            setPost(response.data);
        })
    },[id]);


    return (
        <div>
            {id}
        </div>
    );
}
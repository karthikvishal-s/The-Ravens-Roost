import axios from 'axios';
import { useState } from 'react';
import React from 'react';



export default function PostButtons({id,
    likesCount:likesCountDefault=0,
    likedByMe:likedByMeDefault = false,
    commentsCount,
    refreshPosts})
    
    {
    const [likesCount, setLikesCount] = useState(likesCountDefault);
    
    const [likedByMe, setLikedByMe] = useState(likedByMeDefault);
    async function togglelike(){
        const response= await axios.post('/api/like', {id});
        
        if(response.data.liked ){
            setLikesCount(prev=> prev + 1);
            setLikedByMe(true);

    }
        else{
            setLikesCount(prev=> prev - 1);
            setLikedByMe(false);
        }
        if (refreshPosts) refreshPosts();
    }

    return (
        <div className="flex justify-between items-center p-2 border-t border-gray-600 pt-6 text-white">

            <button className={(likedByMe?'text-white ml-3 flex text-xl':'text-gray-600 ml-3 flex text-xl ')} onClick={togglelike}>
                <img src={'/swords.png'} className={(likedByMe?'w-8 transition-transform transform hover:scale-130 ':'w-7 transition-transform transform hover:scale-130 opacity-50')}></img>
                <span className='ml-2 mt-1 '>{likesCount}</span>
            </button>

            <button className="text-xl text-gray-600 flex">
                <img src={'/circular-arrows.png'} className="w-7"></img>
                <span className="ml-3">0</span>
            </button>

            <button className="text-xl text-gray-600 flex">
                <img src={'/crow.png'} className="w-7"></img>
                <span className="ml-3">0</span>
            </button>

            <button className="text-xl text-gray-600 flex mr-3">
                <   img src={'/manuscript.png'} className="w-7"></img>
                <span className="ml-3">{commentsCount}</span>
            </button>

        </div>
    )
}
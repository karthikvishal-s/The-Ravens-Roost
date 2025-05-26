import axios from 'axios';
import { useState } from 'react';
import React from 'react';



export default function PostButtons({id,
    likesCount:likesCountDefault=0,
    likedByMe:likedByMeDefault = false})
    
    {
    const [likesCount, setLikesCount] = useState(likesCountDefault);
    
    const [likedByMe, setLikedByMe] = useState(likedByMeDefault);
    async function togglelike(){
        const response= await axios.post('/api/like', {id});
        if(response.data.like && response.data){
            setLikesCount(prev=> prev + 1);
            setLikedByMe(true);

    }
        else{
            setLikesCount(prev=> prev - 1);
            setLikedByMe(false);
        }
    }

    return (
        <div className="flex justify-between items-center p-2 border-t border-gray-600 pt-6">
            <button className={(likedByMe?'text-red-500 ml-3 flex':'text-gray-400 ml-3 flex text-xl')} onClick={togglelike}>
                <img src={'/swords.png'} className="w-7 transition-transform transform hover:scale-130 "></img>
                <span className="ml-3">{likesCount}</span>
            </button>

            <button className="text-xl text-gray-400 flex">
                <img src={'/circular-arrows.png'} className="w-7"></img>
                <span className="ml-3">0</span>
            </button>

            <button className="text-xl text-gray-400 flex">
                <img src={'/crow.png'} className="w-7"></img>
                <span className="ml-3">0</span>
            </button>

            <button className="text-xl text-gray-400 flex mr-3">
                <   img src={'/manuscript.png'} className="w-7"></img>
            </button>

        </div>
    )
}
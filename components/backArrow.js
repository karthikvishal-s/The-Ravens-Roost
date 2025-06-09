import Link from 'next/link';




export default function BackArrow({destination}){
    return(
        <Link href={destination} className='flex hover:scale-130 text-white '>
            <img src={'/previous.png'} className='w-9 hover:scale-120 ml-5'></img>
               
            </Link>
    )
}
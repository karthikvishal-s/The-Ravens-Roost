import BackArrow from '@/components/backArrow';
import Cover from '@/components/cover';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import Avatar from '@/components/avatar';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Targaryen from './houses/targaryen';
import Stark from './houses/stark';
import Baratheon from './houses/barratheon';
import Lannister from './houses/lannister';
import Tully from './houses/tully';
import Martell from './houses/martell';


export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;

  const [userData, setUserData] = useState(null);

  async function fetchUser() {
    if (!username) return;
    try {
      
      const response = await axios.get(`/api/users?username=${username}`);
      console.log('Fetched user data:', response.data);
      setUserData(response.data.user); 
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [username]);




  return (
    <Layout>
      <div className="text-white flex mt-5">
        <BackArrow destination="/" />
        <p className="text-2xl ml-10 font-bold">
          {userData?.name2 || username}
        </p>
      </div>

      <div className="mt-7">
        <Cover src={`${userData?.sigil }.jpg`} />
      </div>
      <div className='relative -top-20 ml-10'>
        <Avatar src={userData?.image} profile />
      </div>

      <div className="text-white flex"> 
                <p className="text-3xl ml-9 font-bold ">
                 {userData?.name2 }
                </p>
                <p>
                <span className="text-3xl ml-2 font-bold text-white">
                  {userData?.sigil || "Stark"}
                </span>
                </p>
              </div>

              <div className="flex">
              <div className="text-gray-400 flex"> 
                <p className="text-xl ml-9 font-bold mt-3">
                @  {userData?.username}
                </p>
              </div>

             
              </div>
              <div>
               {userData?.sigil === "Targaryen" && <Targaryen />}


               {userData?.sigil === "Stark"&& <Stark />}


                {userData?.sigil === "Baratheon"&& <Baratheon />}

                {userData?.sigil === "Lannister"&& <Lannister />}

                {userData?.sigil === "Tully" && <Tully />}

                {userData?.sigil === "Martell" && <Martell />}
               
              </div>


    </Layout>
  );
}

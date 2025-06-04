import BackArrow from '@/components/backArrow';
import Cover from '@/components/cover';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;

  const [userData, setUserData] = useState(null);

  async function fetchUser() {
    if (!username) return;
    try {
      const response = await axios.get(`/api/users?username=${username}`);
      setUserData(response.data.user); // assuming you send { user: data }
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
        <Cover src={`${userData?.sigil || 'Targaryen'}.jpg`} />
      </div>
    </Layout>
  );
}

'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import Heading from '@/components/headingandAndImage';
import { FaStore } from "react-icons/fa";
import Frontavatar from '@/components/frontavatar';
export default function Home() {
  const { data: session } = useSession()

  // if (!session) {
  //   return (
  //     <div className="p-6 min-h-screen flex flex-col items-center justify-center">
  //       <h1 className="text-2xl font-bold mb-4">Login Required</h1>
  //       <button
  //         onClick={() => signIn('google')}
  //         className="bg-black text-white px-4 py-2 rounded"
  //       >
  //         Login with Google
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col h-full w-full justify-center items-center px-2">
      <div className="w-auto flex items-center flex-col">
        <Heading />
        {/* {session.user?.email} */}
      </div>

      <div className="flex items-center my-4 mx-10">
        <h1 className="text-xl font-bold flex pr-1.5">Shops</h1>
        <FaStore size={25} />
      </div>

      <Frontavatar />
      <Frontavatar />
    </div>


  );
}

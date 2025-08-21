'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import Heading from '@/components/headingandAndImage';

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Login Required</h1>
        <button
          onClick={() => signIn('google')}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className='w-auto flex items-center flex-col'>
    <Heading/>
    {session.user?.email}
      
    </div>
  );
}

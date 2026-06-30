'use client'
//http://localhost:3000/api/store/getallstores?query=0&limit=2
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Heading from '@/components/headingandAndImage';
import { FaStore } from "react-icons/fa";
import Frontavatar from '@/components/frontavatar';
import axios from 'axios';
export default function Home() {
  const { data: session } = useSession()
  type StoreItem = {
    _id: string;
    ownerDetails: [{
      storeName: string;
      address: string;
      avatar: string;
      coverImage?: string;
      mobileNumber?: string;
      description?: string;
    }];
  };

  const [store, setstore] = useState<StoreItem[]>([])

  const getallstores = async () => {
    try {
      const data = await axios.get(`http://localhost:3000/api/store/getallstores?query=0&limit=2`)
      console.log("all the stores", data.data.store)
      setstore(data.data.store)
      console.log(store)
    } catch (error) {
      console.log('all the store error ', error)
    }

  }

  useEffect(() => {
    getallstores()
  }, [])


  return (
    <div className="flex flex-col  w-full justify-center items-center px-2">
      <div className="w-auto flex items-center flex-col">
        <Heading />
        {/* {session.user?.email} */}
      </div>

      <div className="flex items-center my-4 mx-10">
        <h1 className="text-xl font-bold flex pr-1.5">Shops</h1>
        <FaStore size={25} />
      </div>
      {
        store.map((storeItem) => (
          <Frontavatar
            key={storeItem._id}
            storeName={storeItem.ownerDetails[0]?.storeName}
            address={storeItem.ownerDetails[0]?.address}
            avatar={storeItem.ownerDetails[0]?.avatar}
            coverImage={storeItem.ownerDetails[0]?.coverImage}     // ✅ add this
            mobileNumber={storeItem.ownerDetails[0]?.mobileNumber} // ✅ add this
            description={storeItem.ownerDetails[0]?.description}
            visitStore ={storeItem._id}   // ✅ add this
          />
        ))
      }

    </div>


  );
}

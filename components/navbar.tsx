'use client'
//http://localhost:3000/api/user/login
import React, { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { GrClose } from "react-icons/gr";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import axios from 'axios'
import { useSession, signIn, signOut } from 'next-auth/react';
import { toast } from "sonner";

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

 

  useEffect(() => {
    const checkProfile = async () => {
      if (session?.user?.email) {
        try {
          
          const { data } = await axios.get(`/api/user/isprofilecreated?email=${session.user.email}`);
          setIsRegistered(data?.isRegistered || false);
          console.log('data:', data);
        } catch (error: any) {
          // console.error(error);
          console.log(error?.response?.data?.message, error?.status);
        }
      }
    };
    checkProfile();
  }, );

  // the user has not login yet 
  if (!session) {
    return (<div>
      <Menubar className="bg-black flex justify-between w-auto px-4 rounded-2xl mb-2">
        {/* Logo */}
        <MenubarMenu>
          <MenubarTrigger className="text-white font-bold text-lg">
            VendorsBridge
          </MenubarTrigger>
        </MenubarMenu>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 pr-10 text-white">
          <MenubarMenu>
            <Link href='/'><MenubarTrigger>Home</MenubarTrigger></Link>
            <Link href='/about'><MenubarTrigger>About</MenubarTrigger></Link>
            <MenubarTrigger onClick={() => signIn('google')}>Login</MenubarTrigger>
          </MenubarMenu>

        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white">
          <button onClick={() => setOpen(!open)}>
            {open ? <GrClose size={28} /> : <TiThMenu size={28} />}
          </button>
        </div>
      </Menubar>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-black text-white flex flex-col space-y-2 py-3 items-center mx-3 mb-3 rounded-2xl">
          <button className="text-left">Home</button>
          <Link href ='/about'><button className="text-left">About</button></Link>
          <button className="text-left" onClick={() => signIn('google')}>Login</button>
        </div>
      )}
    </div>)
  }

  // the user has login and created the store as well
  if (session && isRegistered) {
    return (
      <div>
        <Menubar className="bg-black flex justify-between w-auto px-4 rounded-2xl mb-2">
          {/* Logo */}
          <MenubarMenu>
            <MenubarTrigger className="text-white font-bold text-lg">
              VendorsBridge
            </MenubarTrigger>
          </MenubarMenu>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 pr-10 text-white">
            <MenubarMenu>
              <Link href='/'><MenubarTrigger>Home</MenubarTrigger></Link>
              <Link href='/about'><MenubarTrigger>About</MenubarTrigger></Link>
              <Link href='/onlinestore/ok'><MenubarTrigger>MyStore</MenubarTrigger></Link>
              <Link href='/dashboard/ok'><MenubarTrigger>Dashboard</MenubarTrigger></Link>
              <MenubarTrigger onClick={() => signOut()}>Logout</MenubarTrigger>
            </MenubarMenu>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden text-white">
            <button onClick={() => setOpen(!open)}>
              {open ? <GrClose size={28} /> : <TiThMenu size={28} />}
            </button>
          </div>
        </Menubar>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden bg-black text-white flex flex-col space-y-2 py-3 items-center mx-3 mb-3 rounded-2xl">
            <Link href='/'>
              <button className="text-left">Home</button>
            </Link>
            <Link href ='/about'><button className="text-left">About</button></Link>
            <Link href='/onlinestore/ok'><button className="text-left">MyStore</button></Link>
            <Link href='/dashboard/ok'><button className="text-left">Dashboard</button></Link>
            <button className="text-left" onClick={() => signOut()}>Logout</button>
          </div>
        )}
      </div>
    )}


  // user has just login but did not have created the store yet 
  return (
    <div>
      <Menubar className="bg-black flex justify-between w-auto px-4 rounded-2xl mb-2">
        {/* Logo */}
        <MenubarMenu>
          <MenubarTrigger className="text-white font-bold text-lg">
            VendorsBridge
          </MenubarTrigger>
        </MenubarMenu>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 pr-10 text-white">
          <MenubarMenu>
            <Link href='/'><MenubarTrigger>Home</MenubarTrigger></Link>
            <Link href='/about'><MenubarTrigger>About</MenubarTrigger></Link>
          <Link href='/storeregisterform'>
              <MenubarTrigger>CreateStore</MenubarTrigger>
          </Link>
            <MenubarTrigger onClick={() => signOut()}>Logout</MenubarTrigger>
          </MenubarMenu>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white">
          <button onClick={() => setOpen(!open)}>
            {open ? <GrClose size={28} /> : <TiThMenu size={28} />}
          </button>
        </div>
      </Menubar>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-black text-white flex flex-col space-y-2 py-3 items-center mx-3 mb-3 rounded-2xl">
          <Link href='/'>
            <button className="text-left">Home</button>
          </Link>
          <Link href ='/about'><button className="text-left">About</button></Link>
          <Link
            href='/storeregisterform'
          >
            <button className="text-left">CreateStore</button>
          </Link>
          <button className="text-left" onClick={() => signOut()}>Logout</button>
        </div>
      )}
    </div>
  );

};

export default Navbar;

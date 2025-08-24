'use client'
import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { GrClose } from "react-icons/gr";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

import { useSession, signIn, signOut } from 'next-auth/react';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession()
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
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>About</MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu >
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
          <button className="text-left">About</button>
          <button className="text-left" onClick={() => signIn('google')}>Login</button>
        </div>
      )}
    </div>)
  }




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
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>About</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>CreateStore</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
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
          <button className="text-left">Home</button>
          <button className="text-left">About</button>
          <button className="text-left">CreateStore</button>
          <button className="text-left" onClick={() => signOut()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

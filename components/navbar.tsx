import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

const navbar = () => {
    return (
        <div>
            <Menubar className='bg-black flex justify-between'>
                <div>
                    <MenubarMenu>
                        <MenubarTrigger variant="default">VendorsBridge</MenubarTrigger>
                    </MenubarMenu>
                </div>
                <div className='flex justify-between pr-10'>
                    <MenubarMenu>
                        <MenubarTrigger variant="default">Home</MenubarTrigger>
                        <MenubarTrigger variant="default">About</MenubarTrigger>
                        <MenubarTrigger variant="default">DashBoard</MenubarTrigger>
                        <MenubarTrigger variant="default">MyStore</MenubarTrigger>
                        <MenubarTrigger variant="default">logout</MenubarTrigger>
                    </MenubarMenu>
                </div>
            </Menubar>
        </div>
    )
}

export default navbar

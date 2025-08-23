import React from "react";
// shopname
// description 
// avatart
//coverimage
//address 
// rating 
// Mobile
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Button } from "./ui/button";

const ForntAvatar = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">

            <div className="relative w-full max-w-2xl mx-4 mb-20 mt-12">
                {/* Main Image */}
                <img
                    src="/WhatsApp Image 2025-07-13 at 14.37.50_594b1570.jpg"
                    alt="error"
                    className="w-full h-auto max-h-52 object-cover border-2 rounded-2xl border-black "
                />

                {/* Centered Avatar */}
                <img
                    src="/download.png"
                    alt="error"
                    className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 
                     rounded-full border-2 border-black object-cover bg-white"
                />
            </div>

            <div className=" flex justify-around w-full h-full">
                <HoverCard>
                    <HoverCardTrigger className="font-bold text-xl">Store Name</HoverCardTrigger>
                    <HoverCardContent>
                        The React Framework – created and maintained by @vercel.
                    </HoverCardContent>
                </HoverCard>
                <div><Button>Visit Store</Button></div>
            </div>


        </div>
    );
};

export default ForntAvatar;

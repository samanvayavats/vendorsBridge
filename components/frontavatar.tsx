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
import Rating from "./rating";
import { Button } from "./ui/button";

const ForntAvatar = (props: any) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center mx-2">

            <div className="relative w-full max-w-3xl mx-auto my-8">
                {/* Cover Image */}
                <img
                    src="/WhatsApp Image 2025-07-13 at 14.37.50_594b1570.jpg"
                    alt="Cover"
                    className="w-full h-40 sm:h-56 md:h-64 object-cover border-2 rounded-2xl border-black"
                />

                {/* Avatar */}
                <img
                    src="/download.png"
                    alt="Avatar"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8
            h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32
            rounded-full border-2 border-black object-cover bg-white"
                />
            </div>

            <div className=" flex justify-around w-full h-full ">
                <HoverCard>
                    <HoverCardTrigger className="font-bold text-xl">Store Name</HoverCardTrigger>
                    <HoverCardContent>
                        📞 Mobile no. : {props.mobile}
                        <br />
                        🗒️ Description : {props.description}
                        <br />
                        📍Address : {props.ddress}
                      <Rating/>
                    </HoverCardContent>

                </HoverCard>
                <div><Button>Visit Store</Button></div>
            </div>


        </div>
    );
};

export default ForntAvatar;

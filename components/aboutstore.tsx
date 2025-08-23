"use client"


import { useState } from "react"
import React from "react";
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Rating from "./rating";
import Allreview from "./layout/allreview";
import { IoIosCart } from "react-icons/io";
import Productcard from "./productcard";

const AboutStore = () => {
  const [rating, setRating] = useState(0)

  return (
   <div className="w-full h-full">

     <div className="flex flex-col items-center mt-4 px-4">
      {/* Store Name */}
      <h1 className="font-bold text-3xl sm:text-4xl text-center">StoreName</h1>

      {/* Cover + Avatar */}
      <div className="relative w-full max-w-3xl mx-auto my-4">
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

      {/* Details Section */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl border p-6 mt-16 sm:mt-10">
        <h2 className="text-xl font-semibold text-center mb-4">About Store</h2>
        <p className="text-gray-700 text-center mb-4">
          Welcome to <span className="font-semibold">StoreName</span>, your one-stop shop
          for all essentials. We believe in quality and customer satisfaction.
        </p>

        {/* Info List */}
        <div className="space-y-3 text-gray-800">
          <p>
            <span className="font-semibold">📞 Mobile:</span> +91 9876543210
          </p>
          <p>
            <span className="font-semibold">📍 Address:</span> 123 Market Street,
            Chennai, India
          </p>
          <p>
            <span className="font-semibold">👤 Username:</span> storename123
          </p>

          {/*this is the display rating */}
          <Rating />

          {/* this is the add rating  */}
          <div className="flex items-center justify-center gap-2">
            <span className="font-semibold">Add Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="icon"
                onClick={() => setRating(star)}
                className="hover:scale-110 transition"
              >
                <Star
                  className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                    }`}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* this the review section  */}
      {/* add the review */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl border p-6 gap-2 mt-8 flex flex-col">
        <textarea
          placeholder="Add your review"
          rows={4}
          className="p-1.5 w-full rounded-lg bg-main text-black outline-none resize-none text-center"
        ></textarea>
        <Button className="bg-main text-black hover:bg-black hover:text-white ">Add+ </Button>
      </div>

      {/* show all the review */}

      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl border p-4 gap-2 mt-8 flex flex-col items-center">
        <h1 className="font-semibold">All the Reviews</h1>
        <Allreview />
      </div>

    </div>
    
    {/* this is the image section */}
    <div className="w-full h-full text-center my-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-semibold flex justify-center items-center gap-2 mb-8">
        Products we sell <IoIosCart />
      </h1>

      {/* Responsive Wrapper */}
      <div className="flex flex-wrap justify-center gap-6">
        <Productcard />
        <Productcard />
        <Productcard />
        <Productcard />
        <Productcard />
        <Productcard />
      </div>
    </div>

   </div>
  );
};

export default AboutStore;

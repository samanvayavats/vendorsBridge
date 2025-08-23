"use client"

import React, { useState } from "react"

const Page = () => {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [cover, setCover] = useState<File | null>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0])
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCover(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center mx-2">
      <div className="w-full max-w-lg bg-black p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Get your store online
        </h1>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <input
            type="text"
            placeholder="Store Name"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <input
            type="text"
            placeholder="Address"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <textarea
            placeholder="Description of the business"
            rows={4}
            className="p-3 rounded-lg bg-main text-black outline-none resize-none"
          ></textarea>

          {/* Avatar Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-white text-sm">Avatar</label>
            {avatar ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar Preview"
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setAvatar(null)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="p-2 rounded-lg bg-main text-black outline-none"
              />
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-white text-sm">Cover Image</label>
            {cover ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={URL.createObjectURL(cover)}
                  alt="Cover Preview"
                  className="w-full h-40 object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setCover(null)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="p-2 rounded-lg bg-main text-black outline-none"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-main text-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page

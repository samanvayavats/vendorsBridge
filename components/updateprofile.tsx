"use client"
import React, { useState, ChangeEvent } from "react"
import { X } from "lucide-react"

const UpdateProfile: React.FC = () => {
  const [storeName, setStoreName] = useState<string>("My Store")
  const [description, setDescription] = useState<string>("This is my store description.")
  const [address, setAddress] = useState<string>("123 Street, City, Country")
  const [mobileNo, setMobileNo] = useState<string>("9876543210")

  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [cover, setCover] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, type: "avatar" | "cover") => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === "avatar") {
        setAvatar(file)
        setAvatarPreview(URL.createObjectURL(file))
      } else {
        setCover(file)
        setCoverPreview(URL.createObjectURL(file))
      }
    }
  }

  const handleRemoveImage = (type: "avatar" | "cover") => {
    if (type === "avatar") {
      setAvatar(null)
      setAvatarPreview(null)
    } else {
      setCover(null)
      setCoverPreview(null)
    }
  }

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 border">
        <h1 className="text-2xl font-semibold mb-6 text-center">Update Profile</h1>

        {/* Store Name */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-2/3">
            <label className="block font-medium">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Update
          </button>
        </div>

        {/* Description */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-2/3">
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              rows={2}
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg self-start hover:bg-blue-700 transition">
            Update
          </button>
        </div>

        {/* Address */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-2/3">
            <label className="block font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Update
          </button>
        </div>

        {/* Mobile Number */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-2/3">
            <label className="block font-medium">Mobile Number</label>
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Update
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-2/3">
            <label className="block font-medium">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "avatar")}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-lg cursor-pointer p-2"
            />
            {avatarPreview && (
              <div className="relative mt-3 w-24 h-24">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-24 h-24 object-cover rounded-full border shadow"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage("avatar")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Update
          </button>
        </div>

        {/* Cover Image */}
        <div className="flex justify-between items-center">
          <div className="w-2/3">
            <label className="block font-medium">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "cover")}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-lg cursor-pointer p-2"
            />
            {coverPreview && (
              <div className="relative mt-3 w-full h-32">
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="w-full h-32 object-cover rounded-lg border shadow"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage("cover")}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg self-start hover:bg-blue-700 transition">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile

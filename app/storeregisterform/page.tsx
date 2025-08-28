"use client"
//http://localhost:3000/api/user/profileregister
import React, { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useSession, signIn } from "next-auth/react"

const Page = () => {
  const { data: session } = useSession()

  const [avatar, setAvatar] = useState<File | null>(null)
  const [cover, setCover] = useState<File | null>(null)
  const [isUploaded, setisUploaded] = useState(false)
  const [userName, setuserName] = useState('')
  const [storeName, setstoreName] = useState('')
  const [mobileNumber, setmobileNumber] = useState('')
  const [address, setaddress] = useState('')
  const [description, setdescription] = useState('')

 

  const submitForm = async () => {
        setisUploaded(true)
    if (!avatar || !cover || !userName || !storeName || !mobileNumber || !address || !description) {
      toast.error('All the fields are required')
      return
    }

    const form = new FormData()
    form.append("userName", userName)
    form.append("storeName", storeName)
    form.append("address", address)
    form.append("mobileNumber", mobileNumber)
    form.append("description", description)
    form.append("email", session?.user?.email || '')
    if (avatar) {
      form.append('avatar', avatar)
    }
    if (cover) {
      form.append('coverImage', cover)
    }

    try {
      const { data } = await axios.post(`http://localhost:3000/api/user/profileregister`, form)
      toast.success('The form has been submitted successfully and your shop is onAir')
      console.log(data)
      
    } catch (error) {
      console.log(error)
      toast.error('Form submission failed')
    }
    finally{
      setisUploaded(false)
      setAvatar(null)
      setCover(null)
      setuserName('')
      setstoreName('')
      setaddress('')
      setmobileNumber('')
      setdescription('')
    }
  }


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

  if (!session) {
    return <div className="p-6 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login Required</h1>
      <button
        onClick={() => signIn('google')}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Login with Google
      </button>
    </div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center mx-2">
      <div className="w-full max-w-lg bg-black p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Get your store online
        </h1>

        <form className="flex flex-col space-y-4" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
          <input
            onChange={(e) => { setuserName(e.target.value) }}
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <input
            type="text"
            onChange={(e) => { setstoreName(e.target.value) }}
            placeholder="Store Name"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <input
            type="tel"
            onChange={(e) => { setmobileNumber(e.target.value) }}
            placeholder="Mobile Number"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <input
            type="text"
            onChange={(e) => { setaddress(e.target.value) }}
            placeholder="Address"
            className="p-3 rounded-lg bg-main text-black outline-none"
          />

          <textarea
            placeholder="Description of the business"
            onChange={(e) => { setdescription(e.target.value) }}
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
            {isUploaded  ? 'Registering' : "Register"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page

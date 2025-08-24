"use client"
import React, { useState, ChangeEvent, FormEvent } from "react"
import { X } from "lucide-react" // cross icon (optional if you use lucide-react)

interface ProductData {
  image: File | null
  description: string
  price: string
}

const ProductForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState<string>("")

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreview(null)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const productData: ProductData = {
      image,
      description,
      price,
    }

    console.log("Product submitted:", productData)
    alert("✅ Product submitted! Check console for data.")
  }

  return (
    <div className="w-full flex justify-center mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add Product
        </h2>

        {/* Product Image */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer p-2"
          />

          {/* Preview with remove option */}
          {preview && (
            <div className="mt-4 relative flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            rows={3}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default ProductForm

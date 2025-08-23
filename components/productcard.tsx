import React from 'react'

const ProductCard = () => {
  return (
    <div className="flex flex-col items-center bg-white border rounded-xl shadow-md p-4 
                    w-40 sm:w-48 md:w-56 lg:w-64 transition hover:shadow-lg">
      
      {/* Product Image */}
      <img
        src="/download.png"
        alt="Product"
        className="w-full h-32 sm:h-40 md:h-44 object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="flex flex-col items-center mt-3 text-center space-y-1">
        <p className="text-sm sm:text-base font-medium text-gray-800">
          Description of product
        </p>
        <p className="text-base sm:text-lg font-semibold text-green-600">
          ₹ Price of product
        </p>
      </div>
    </div>
  )
}

export default ProductCard

'use client'

import React,{useState} from 'react'
import { Star } from 'lucide-react'
const rating = () => {
  const [average, setaverage] = useState(5)
  return (
    <div className=" flex gap-2">
                <span className="font-semibold">⭐ Rating:</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${star <= average ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
  )
}

export default rating

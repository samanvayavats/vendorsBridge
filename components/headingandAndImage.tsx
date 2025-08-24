'use client'
import React, { useState, useEffect } from 'react'

const HeadingAndImage = () => {
  const fullText = "Empowering the local market"
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, index + 1))
      index++
      if (index === fullText.length) {
        // clearInterval(interval)
        index=0
      }
    }, 100)

    // return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <h1 className="text-3xl font-bold">{displayed}</h1>
      <img
        src="/download.png"
        alt="error"
        className="max-w-xs w-full h-auto object-contain"
      />
    </div>
  )
}

export default HeadingAndImage

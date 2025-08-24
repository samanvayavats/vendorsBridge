import React from 'react'

const dasboardanalytics = () => {
  return (
   <div className="w-full flex flex-col items-center max-w-2xl bg-white shadow-md rounded-2xl border p-4 mt-6 mx-2">
  <h1 className="font-semibold text-xl text-center mb-4">
    Store Analytics
  </h1>

  {/* Responsive layout for content */}
  <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full gap-4">
    <div className="w-full md:w-1/2 text-center md:text-left font-medium">
      Channel Visits : _

    </div>
    <div className="w-full md:w-1/2 flex justify-center items-center border rounded-lg p-4 text-sm text-gray-500">
      Graph coming soon
    </div>
  </div>
</div>

  )
}

export default dasboardanalytics

import React from 'react'

export const HeaderSkeleton = () => {
  return (
    <header
      className="animate-pulse px-8 py-4 flex flex-col gap-4 mt-4"
    >
      <h1 
        className="bg-slate-400 w-full md:w-1/4 h-9 rounded"
      />
      <h2
        className="bg-slate-400 w-full md:w-1/2 h-4 rounded"
      />
    </header>
  )
}

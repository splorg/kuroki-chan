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

export const ContentSkeleton = () => {
  return (
    <section className="animate-pulse mt-4 mb-8 flex flex-col gap-3">
      <div className="rounded-lg p-4 mx-6 w-full md:w-1/3 h-80 bg-slate-400" />
      <div className="rounded-lg p-4 mx-6 w-full md:w-1/4 h-96 bg-slate-400" />
      <div className="rounded-lg p-4 mx-6 w-full md:w-1/2 h-[40rem] bg-slate-400" />
    </section>
  )
}

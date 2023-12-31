const NotFound = () => {
  return (
    <main
      className='flex items-center justify-center flex-col gap-4 mx-auto min-h-custom'
    >
      <h1 className='text-xl'>not found!</h1>
      <img
        src="/not-found.webp"
        alt='Confused Kuroki-chan.'
        width={330}
        height={330}
        className='outline outline-2 outline-white'
      />
    </main>
  )
}

export default NotFound
const NotFound = () => {
  return (
    <main className="flex items-center justify-center flex-col gap-4 mx-auto my-40">
      <h1 className="text-xl">not found!</h1>
      <img
        src="/not-found.webp"
        alt="Confused Kuroki-chan."
        width={330}
        height={330}
        className="outline-2 outline-border"
      />
    </main>
  );
};

export default NotFound;

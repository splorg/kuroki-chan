import Link from "next/link"
import { getBoardInfo } from "../lib/data"

type Props = {
  board: string
}

const Header = async ({ board }: Props) => {
  const { title, meta_description } = await getBoardInfo(board)

  return (
    <header
      className="px-8 py-4 flex flex-col gap-4 mt-4"
    >
      <h1 
        className="text-4xl"
        dangerouslySetInnerHTML={{__html: title}} 
      />
      <h2 
        dangerouslySetInnerHTML={{__html: meta_description}} 
      />
      <div className="flex gap-4">
        <Link className="underline hover:opacity-50 transition-all duration-200" href={`/catalog/${board}`}>Catalog</Link>
        <Link className="underline hover:opacity-50 transition-all duration-200" href={`/board/${board}`}>Threads</Link>
      </div>
    </header>
  )
}

export default Header

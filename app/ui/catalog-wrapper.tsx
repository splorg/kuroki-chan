import { getCatalog } from "../lib/data"
import { CatalogPreview } from "./catalog-preview"

type Props = {
  board: string
}

export const CatalogWrapper = async ({ board }: Props) => {
  const threads = await getCatalog(board)

  return (
    <section className="p-4 grid grid-cols-auto-fit-300 gap-4">
      {threads.map(thread => (
        <CatalogPreview post={thread} board={board} />
      ))}
    </section>
  )
}

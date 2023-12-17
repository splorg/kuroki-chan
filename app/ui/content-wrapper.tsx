import Thread from "./thread"
import { getBoard } from "../lib/data"

type Props = {
  board: string
  page: string
}

const ContentWrapper = async ({ board, page }: Props) => {
  const content = await getBoard(board, Number(page))

  return (
    <section className="mt-4 mb-8 flex flex-col gap-3">
      {content.map(thread => (
        <Thread key={thread.posts[0].no} thread={thread} board={board} />
      ))}
    </section>
  )
}

export default ContentWrapper
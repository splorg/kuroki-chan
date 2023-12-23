import Thread from "./thread"
import Pagination from "./pagination"
import { getBoard } from "../lib/data"

type ListProps = {
  mode: 'list'
  board: string
  page: string
}

type ThreadProps = {
  mode: 'thread'
  board: string
  threadId: string
}

type Props = ListProps | ThreadProps

const ContentWrapper = async (props: Props) => {
  if (props.mode === 'list') {
    const content = await getBoard(props.board, Number(props.page))
    const threadIds = content.map(thread => thread.posts[0].no)

    return (
      <>
        <section className="mt-4 mb-8 flex flex-col gap-3">
          {threadIds.map(thread => (
            <Thread key={thread} id={thread.toString()} board={props.board} expanded={false} />
          ))}
        </section>
        <div className="p-4 mb-8">
          <Pagination pages={10} />
        </div>
      </>
    )
  } else {
    return (
      <section className="mt-8 mb-12 flex flex-col gap-3">
        <Thread key={props.threadId} id={props.threadId} board={props.board} expanded />
      </section>
    )
  }
}

export default ContentWrapper
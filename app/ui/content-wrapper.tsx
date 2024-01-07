import { Suspense } from "react"

import { useStore } from "@/stores/store"

import Thread from "./thread"
import Pagination from "./pagination"
import { getBoard } from "../lib/data"
import { ContentSkeleton, ThreadSkeleton } from "./skeletons"

const ContentWrapper = async () => {
  const { board, page, thread } = useStore.getState()

  if (thread) {
    return (
      <Suspense fallback={<ThreadSkeleton />}>
        <section className="mt-8 mb-12 flex flex-col gap-3">
          <Thread key={thread} id={thread} expanded />
        </section>
      </Suspense>
    )
  }
  
  const content = await getBoard(board, Number(page))
  const threadIds = content.map(thread => thread.posts[0].no)

  return (
    <Suspense fallback={<ContentSkeleton />}>
      <section className="mt-4 mb-8 flex flex-col gap-3">
        {threadIds.map(thread => (
          <Thread key={thread} id={thread.toString()} />
        ))}
      </section>
      <div className="p-4 mb-8">
        <Pagination pages={10} />
      </div>
    </Suspense>
  )
}

export default ContentWrapper
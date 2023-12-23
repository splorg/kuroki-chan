import { Suspense } from "react"

import Header from "@/app/ui/header"
import { notFound } from "next/navigation"
import ContentWrapper from "@/app/ui/content-wrapper"
import { ContentSkeleton, HeaderSkeleton, ThreadSkeleton } from "@/app/ui/skeletons"

const Board = async ({ 
  params, 
  searchParams 
}: { 
  params: { 
    board: string[] 
  }, 
  searchParams: { 
    page: string
   } 
}) => {
  if (![1, 2].includes(params.board.length)) {
    notFound()
  }

  const board = params.board[0]
  const page = searchParams.page || '1'
  const thread = params.board[1]

  let contentWrapperProps: Record<string, string> = {
    board
  }

  if (!!thread) {
    contentWrapperProps.mode = 'thread'
  } else {
    contentWrapperProps.mode = 'list'
    contentWrapperProps.page = 'page'
  }

  return (
    <main className="flex flex-col gap-2">
      {!thread ? (
        <Suspense fallback={<HeaderSkeleton />}>
          <Header
            board={board}
          />
        </Suspense>
      ) : null}
      {thread ? (
        <Suspense fallback={<ThreadSkeleton />}>
          <ContentWrapper mode="thread" board={board} threadId={thread}/>
        </Suspense>
      ) : (
        <Suspense fallback={<ContentSkeleton />}>
          <ContentWrapper mode="list" board={board} page={page} />
        </Suspense>
      )}
    </main>
  )
}

export default Board

import { Suspense } from "react"

import Header from "@/app/ui/header"
import { useStore } from "@/stores/store"
import { notFound } from "next/navigation"
import { HeaderSkeleton } from "@/app/ui/skeletons"
import ContentWrapper from "@/app/ui/content-wrapper"
import StoreInitializer from "@/app/ui/store-initializer"
import clsx from "clsx"
import { isBoardSafe } from "@/utils/isBoardSafe"

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

  useStore.setState({ board, page, thread })

  const classname = clsx(
    'flex flex-col gap-2',
    {
      'bg-board-sfw': isBoardSafe(board),
      'bg-board-nsfw': !isBoardSafe(board)
    }
  )

  return (
    <main className={classname}>
      <StoreInitializer page={page} board={board} />
      {!thread ? (
        <Suspense fallback={<HeaderSkeleton />}>
          <Header
            board={board}
          />
        </Suspense>
      ) : null}
      <ContentWrapper />
    </main>
  )
}

export default Board

import { Suspense } from "react"

import Header from "@/app/ui/header"
import { useStore } from "@/stores/store"
import { notFound } from "next/navigation"
import { HeaderSkeleton } from "@/app/ui/skeletons"
import ContentWrapper from "@/app/ui/content-wrapper"
import StoreInitializer from "@/app/ui/store-initializer"

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

  return (
    <main className="flex flex-col gap-2">
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

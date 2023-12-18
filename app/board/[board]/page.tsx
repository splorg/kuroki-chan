import { Suspense } from "react"

import Header from "@/app/ui/header"
import ContentWrapper from "@/app/ui/content-wrapper"
import { ContentSkeleton, HeaderSkeleton } from "@/app/ui/skeletons"

const Board = async ({ 
  params, 
  searchParams 
}: { 
  params: { 
    board: string 
  }, 
  searchParams: { 
    page: string
   } 
}) => {
  const board = params.board
  const page = searchParams.page || '1'

  return (
    <main className="flex flex-col gap-2">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header
          board={board}
        />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <ContentWrapper board={board} page={page} />
      </Suspense>
    </main>
  )
}

export default Board

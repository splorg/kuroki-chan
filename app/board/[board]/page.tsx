import { Suspense } from "react"

import Header from "@/app/ui/header"
import { HeaderSkeleton } from "@/app/ui/skeletons"

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

  return (
    <main>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header
          board={board}
        />
      </Suspense>
    </main>
  )
}

export default Board

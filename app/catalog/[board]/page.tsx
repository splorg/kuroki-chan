import { Suspense } from "react"

import Header from "@/app/ui/header"
import { CatalogWrapper } from "@/app/ui/catalog-wrapper"
import { CatalogSkeleton, HeaderSkeleton } from "@/app/ui/skeletons"

const Catalog = async ({ 
  params
}: { 
  params: { 
    board: string 
  }
}) => {
  const board = params.board

  return (
    <main className="bg-catalog">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header
          board={board}
        />
      </Suspense>
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogWrapper board={board} />
      </Suspense>
    </main>
  )
}

export default Catalog
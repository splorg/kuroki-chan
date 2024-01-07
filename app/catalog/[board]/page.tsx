import { getCatalog } from "@/app/lib/data"
import { CatalogWrapper } from "@/app/ui/catalog-wrapper"
import Header from "@/app/ui/header"
import { CatalogSkeleton, HeaderSkeleton } from "@/app/ui/skeletons"
import { Suspense } from "react"

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
'use client'

import { generatePagination } from "@/utils/generatePagination"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

type Props = {
  pages: number
}

const Pagination = ({ pages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const allPages = generatePagination(currentPage, pages)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  return (
    <>
      <div className="flex justify-end">
        <PaginationArrow 
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        <div className="flex -space-x-px">
          {allPages.map((page, i) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined

            if (i === 0) position = 'first'
            if (i === allPages.length - 1) position = 'last'
            if (allPages.length === 1) position = 'single'
            if (page === '...') position = 'middle'

            return (
              <PaginationNumber 
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            )
          })}
        </div>
        <PaginationArrow 
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= pages}
        />
      </div>
    </>
  )
}

const PaginationNumber = ({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) => {
  const className = clsx(
    'flex h-8 w-8 items-center justify-center text-sm bg-slate-600',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-slate-700 border-slate-700 text-white': isActive,
      'hover:bg-slate-700': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

const PaginationArrow = ({ 
  href, 
  direction, 
  isDisabled 
}: { 
  href: string 
  direction: 'left' | 'right' 
  isDisabled?: boolean 
}) => {
  const className = clsx(
    'flex bg-gray-600 h-8 w-8 items-center justify-center rounded-md',
    {
      'cursor-not-allowed text-gray-300 opacity-50': isDisabled,
      'hover:bg-gray-700': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right'
    }
  )

  const icon = direction === 'left' ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className}>
      {icon}
    </Link>
  )
}

export default Pagination
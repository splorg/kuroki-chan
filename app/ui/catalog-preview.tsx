import Link from "next/link"

import PostFile from "./post-file"
import { Post } from "../lib/definitions"

type Props = {
  post: Post
  board: string
}

export const CatalogPreview = ({ post, board }: Props) => {
  return (
    <div className="flex flex-col gap-3 items-center max-w-xs relative p-3">
      <PostFile post={post} board={board} />
      <div className="flex flex-col items-center text-center">
        <span>{post.replies} / {post.images}</span>
        {post.sub ? (
          <span className="text-red-400" dangerouslySetInnerHTML={{ __html: post.sub }} />
        ) : null}
        {post.com ? (
        <span
          className="[&_a]:text-[#38bdf8] [&_a:hover]:underline [&_a:hover]:brightness-75 [&_a]:transition-all [&_a]:duration-200 truncate max-w-[30ch] max-h-32"
          dangerouslySetInnerHTML={{ __html: post.com }} 
        />
      ) : null}
      </div>
      <Link href={`/board/${board}/${post.no}`} className="absolute top-0 left-0 bottom-0 right-0 hover:bg-opacity-10 hover:bg-white rounded transition-all duration-200" />
    </div>
  )
}

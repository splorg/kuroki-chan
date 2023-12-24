import Link from "next/link"

import Post from "./post"
import { getThread } from "../lib/data"

type Props = {
  id: string
  board: string
  expanded: boolean
}

const Thread = async ({ id, board, expanded }: Props) => {
  const threadContent = await getThread(board, Number(id))
  const op = threadContent.posts[0]
  const replies = threadContent.posts.slice(1).sort((a, b) => a.time - b.time)
  const previewReplies = replies.slice(-5)

  return (
    <section id={`${op.no}`} className="rounded-lg p-4 bg-slate-600 mx-6 w-fit">
      <Post post={op} board={board} thread={threadContent} />
      {expanded ? (
        <div className="flex flex-col gap-3 py-2 px-4">
          {replies.map(reply => (
            <Post key={reply.no} post={reply} board={board} thread={threadContent} />
          ))}
        </div>
        ) : op.replies! > 0 ? (
          <details>
            <summary className="cursor-pointer p-2 hover:text-red-400 transition-colors duration-300">
              See replies
            </summary>
            <div className="flex flex-col gap-3 py-2 px-4">
              {op.replies! > previewReplies.length ? (
                <Link href={`/board/${board}/${op.no}`} className="flex items-center gap-1 text-red-400 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                  <span>See all posts ({op.replies})</span>
                </Link>
              ) : null}
              {previewReplies.map(reply => (
                <Post key={reply.no} post={reply} board={board} thread={threadContent} />
              ))}
            </div>
          </details>
        ) : (
          <p className="p-2 text-red-400">No replies</p>
        )}
    </section>
  )
}

export default Thread
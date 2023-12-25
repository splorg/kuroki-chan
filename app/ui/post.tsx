import { useStore } from "@/stores/store"

import PostFile from "./post-file"
import PostInfo from "./post-info"
import PostContent from "./post-content"
import { Post, Thread } from "../lib/definitions"

type Props = {
  post: Post
  thread: Thread
}

const Post = ({ post, thread }: Props) => {
  const board = useStore.getState().board

  return (
    <div id={`p${post.no}`} className="rounded-lg bg-slate-700 w-fit p-4 flex flex-col md:flex-row gap-8 justify-evenly relative">
    <PostFile post={post} board={board} />
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <PostInfo post={post} />
        <PostContent post={post} thread={thread} board={board} />
      </div>
    </div>
  </div>
  )
}

export default Post

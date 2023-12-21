import Image from "next/image"
import { generateImageUrl } from "@/utils/generateImageUrl"
import { dateStringFromTimestamp } from "@/utils/dateStringFromTimestamp"

import { Post } from "../lib/definitions"

type Props = {
  post: Post
  board: string
}

const Post = ({ post, board }: Props) => {
  return (
    <div id={`p${post.no}`} className="rounded-lg bg-slate-700 w-fit p-4 flex flex-col md:flex-row gap-8 justify-evenly">
    {post.tim && post.ext && post.ext !== '.webm' ? (
      <div>
        <Image
          src={generateImageUrl(post, board)}
          alt={`${post.tim}${post.ext}`}
          width={post.tn_w}
          height={post.tn_h}
          unoptimized
        />
      </div>
    ) : null}
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        {post.sub ? (
            <h3 className="text-red-400" dangerouslySetInnerHTML={{ __html: post.sub }} />
        ) : null}
        <span className="text-green-400">{post.name} - {dateStringFromTimestamp(post.time)} - #{post.no}</span>
      </div>
      {post.com ? (
        <div 
          className="[&_a]:text-[#38bdf8] [&_a:hover]:underline [&_a:hover]:brightness-75 [&_a]:transition-all [&_a]:duration-200"
          dangerouslySetInnerHTML={{__html: post.com}} 
        />
      ) : null}
    </div>
  </div>
  )
}

export default Post

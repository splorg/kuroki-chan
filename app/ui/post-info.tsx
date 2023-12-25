import { dateStringFromTimestamp } from "@/utils/dateStringFromTimestamp"

import { Post } from "../lib/definitions"

type Props = {
  post: Post
}

const PostInfo = ({ post }: Props) => {
  return (
    <>
      {post.sub ? (
          <h3 className="text-red-400" dangerouslySetInnerHTML={{ __html: post.sub }} />
      ) : null}
      <span className="text-green-400">{post.name} - {dateStringFromTimestamp(post.time)} - #{post.no}</span>
    </>
  )
}

export default PostInfo
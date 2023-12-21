import { Post } from "@/app/lib/definitions";

export const generateThumbnailUrl = (post: Post, board: string) => {
  if (!post.tim || !post.ext) return ''

  return `/api/thumbnail?board=${board}&tim=${post.tim}`
}

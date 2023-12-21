import { Post } from "@/app/lib/definitions";

export const generateImageUrl = (post: Post, board: string) => {
  if (!post.tim || !post.ext) return ''

  return `/api/image?board=${board}&tim=${post.tim}&ext=${post.ext}`
}

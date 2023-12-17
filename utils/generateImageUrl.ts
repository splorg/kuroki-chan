import { CDN_BASE_URL } from "@/app/lib/constants";
import { Post } from "@/app/lib/definitions";

export const generateImageUrl = (post: Post, board: string) => {
  if (!post.tim || !post.ext) return ''

  return `${CDN_BASE_URL}/${board}/${post.tim}${post.ext}`
}

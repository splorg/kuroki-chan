import { Post } from "@/app/lib/definitions";

export const generateImageUrl = (post: Post, board: string) => {
  const BASE_IMAGE_URL = 'https://i.4cdn.org'

  if (!post.tim || !post.ext) return ''

  return `${BASE_IMAGE_URL}/${board}/${post.tim}.${post.ext}`
}

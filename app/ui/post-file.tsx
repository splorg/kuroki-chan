'use client'

import { SlideImage, SlideVideo } from "yet-another-react-lightbox"

import useLightbox from "@/hooks/useLightbox"
import { generateFileUrl } from "@/utils/generateFileUrl"
import { generateThumbnailUrl } from "@/utils/generateThumbnailUrl"

import { Post } from "../lib/definitions"

type Props = {
  post: Post
  board: string
}


const PostFile = ({ post, board }: Props) => {
  const { openLightbox, renderLightbox } = useLightbox()

  const hasFile = post.tim && post.ext

  const imageSlide: SlideImage[] = [
    {
      type: 'image',
      src: generateFileUrl(post, board)
    }
  ]

  const videoSlide: SlideVideo[] = [
    {
      type: 'video',
      sources: [
        { src: generateFileUrl(post, board), type: 'video/webm' }
      ],
      controls: true,
      autoPlay: true,
      loop: true,
    }
  ]

  return (
    <>
      {hasFile ? (
        <div>
          <img
            src={generateThumbnailUrl(post, board)}
            alt={`${post.tim}${post.ext}`}
            width={post.tn_w}
            height={post.tn_h}
            onClick={openLightbox}
            loading="lazy"
            className="cursor-pointer rounded hover:scale-110 hover:rounded-none transition-all ease-linear"
          />
          {hasFile && post.ext === '.webm' ? (
            <span className="text-red-400 text-sm">(video)</span>
          ) : null}
        </div>
      ) : null}
      {renderLightbox({ 
        slides: post.ext! === '.webm' ? videoSlide : imageSlide, 
        render: {
          buttonPrev: () => null,
          buttonNext: () => null,
        },
        video: {
          controls: true,
          autoPlay: true,
          loop: true
        },
      })}
    </>
  )
}

export default PostFile
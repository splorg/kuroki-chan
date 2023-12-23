'use client'

import useLightbox from "@/hooks/useLightbox"
import { generateThumbnailUrl } from "@/utils/generateThumbnailUrl"
import { dateStringFromTimestamp } from "@/utils/dateStringFromTimestamp"

import { Post } from "../lib/definitions"
import { generateFileUrl } from "@/utils/generateFileUrl"
import { SlideImage, SlideVideo } from "yet-another-react-lightbox"

type Props = {
  post: Post
  board: string
}

const Post = ({ post, board }: Props) => {
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
    <div id={`p${post.no}`} className="rounded-lg bg-slate-700 w-fit p-4 flex flex-col md:flex-row gap-8 justify-evenly">
    {hasFile ? (
      <div>
        <img
          src={generateThumbnailUrl(post, board)}
          alt={`${post.tim}${post.ext}`}
          width={post.tn_w}
          height={post.tn_h}
          onClick={openLightbox}
          loading="lazy"
          className="cursor-pointer"
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
  </div>
  )
}

export default Post

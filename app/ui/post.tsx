'use client'

import { useEffect, useRef, useState } from "react"

import { SlideImage, SlideVideo } from "yet-another-react-lightbox"

import useLightbox from "@/hooks/useLightbox"
import { generateFileUrl } from "@/utils/generateFileUrl"
import { generateThumbnailUrl } from "@/utils/generateThumbnailUrl"
import { dateStringFromTimestamp } from "@/utils/dateStringFromTimestamp"
import { parsePostIdFromQuotelink } from "@/utils/parsePostIdFromQuotelink"

import { Post, Thread } from "../lib/definitions"

type Props = {
  post: Post
  board: string
  thread: Thread
}

const Post = ({ post, board, thread }: Props) => {
  const { openLightbox, renderLightbox } = useLightbox()
  const [isHovering, setIsHovering] = useState(false)
  const [repliedPost, setRepliedPost] = useState<Post>()
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [modifiedContent, setModifiedContent] = useState(post.com)
  const mouseMoveRef = useRef<HTMLDivElement>(null)

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

  const modifyQuotelinks = (html: string, op: number) => {
    if (typeof window === 'undefined') {
      return html
    }

    const doc = new DOMParser().parseFromString(html, 'text/html')
    const quotelinks = doc.querySelectorAll('a.quotelink')
  
    quotelinks.forEach((quotelink) => {
      const href = quotelink.getAttribute('href')!
      const quotedPostId = parsePostIdFromQuotelink(href)
  
      if (Number(quotedPostId) === op) {
        quotelink.textContent += ' (OP)'
      }
    })
  
    return doc.body.innerHTML
  }

  const checkHover = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.tagName === 'A' && target.className === 'quotelink') {
      if (!isHovering) {
        setIsHovering(true)
        const repliedPostId = parsePostIdFromQuotelink(target.getAttribute('href')!)
        const repliedPost = thread.posts.find(post => post.no === Number(repliedPostId))
        setRepliedPost(repliedPost)
      }
    } else {
      if (isHovering) {
        setIsHovering(false)
        setRepliedPost(undefined)
      }
    }
  }

  useEffect(() => {
    setModifiedContent(modifyQuotelinks(post.com, thread.posts[0].no))
  }, [post.com, thread.posts])

  useEffect(() => {
    const postRef = mouseMoveRef.current

    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    if (postRef) {
      postRef.addEventListener('mousemove', updateCursorPosition)
      postRef.addEventListener("mousemove", checkHover, true)
    }
   

    return () => {
      if (postRef) {
        postRef.removeEventListener('mousemove', updateCursorPosition)
        postRef.removeEventListener("mousemove", checkHover, true)
      }
    }
  }, [isHovering, repliedPost])

  return (
    <div ref={mouseMoveRef} id={`p${post.no}`} className="rounded-lg bg-slate-700 w-fit p-4 flex flex-col md:flex-row gap-8 justify-evenly relative">
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
          dangerouslySetInnerHTML={{__html: modifiedContent}} 
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

    {isHovering && repliedPost !== undefined ? (
      <div 
        style={{ 
          position: 'fixed', 
          top: `${cursorPosition.y + 30}px`,  
          left: `${cursorPosition.x - 30}px`, 
          zIndex: '9999', 
          opacity: '0.9' 
        }}
      >
        <Post board={board} post={repliedPost} thread={thread} />
      </div>
    ) : null}
  </div>
  )
}

export default Post

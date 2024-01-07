'use client'

import { ElementRef, useEffect, useRef, useState } from "react"

import { parsePostIdFromQuotelink } from "@/utils/parsePostIdFromQuotelink"

import Post from "./post"
import { Post as PostType, Thread } from "../lib/definitions"

type Props = {
  post: PostType
  thread: Thread
  board: string
}

const PostContent = ({ post, thread, board }: Props) => {
  const [isHovering, setIsHovering] = useState(false)
  const [repliedPost, setRepliedPost] = useState<Post>()
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [modifiedContent, setModifiedContent] = useState(post.com)
  const mouseMoveRef = useRef<ElementRef<'div'>>(null)


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

  useEffect(() => {
    setModifiedContent(modifyQuotelinks(post.com, thread.posts[0].no))
  }, [post.com, thread.posts])

  useEffect(() => {
    const postRef = mouseMoveRef.current

    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const isOutOfView = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
  
      return (
        rect.bottom <= 0 ||
        rect.right <= 0 ||
        rect.top >= window.innerHeight ||
        rect.left >= window.innerHeight
      )
    }

    const handleScroll = (e: Event) => {
      const post = mouseMoveRef.current

      if (!post) return

      if (isOutOfView(post)) {
        setRepliedPost(undefined)
        setIsHovering(false)
      }
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

    window.addEventListener('scroll', handleScroll)

    if (postRef) {
      postRef.addEventListener('mousemove', updateCursorPosition)
      postRef.addEventListener("mousemove", checkHover, true)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (postRef) {
        postRef.removeEventListener('mousemove', updateCursorPosition)
        postRef.removeEventListener("mousemove", checkHover, true)
      }
    }
  }, [isHovering, repliedPost, thread.posts])

  return (
    <div>
      {post.com ? (
        <div
          ref={mouseMoveRef}
          className="[&_a]:text-[#38bdf8] [&_a:hover]:underline [&_a:hover]:brightness-75 [&_a]:transition-all [&_a]:duration-200"
          dangerouslySetInnerHTML={{__html: modifiedContent}} 
        />
      ) : null}
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
        <Post post={repliedPost} thread={thread} />
      </div>
    ) : null}
    </div>
  )
}

export default PostContent
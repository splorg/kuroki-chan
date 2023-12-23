'use client'
import { useState } from "react"

import Link from "next/link"

import { ALLOWED_BOARDS } from "../lib/constants"
import ToggleSwitch from "./toggle-switch"

export const Navigation = () => {
  const filteredBoards = ALLOWED_BOARDS.filter(board => board.sfw)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [nsfwAllowed, setNsfwAllowed] = useState(false)
  const [boards, setBoards] = useState(filteredBoards)

  const handleAllowNsfw = (value: boolean) => {
    if (value) {
      setNsfwAllowed(true)
      setBoards(ALLOWED_BOARDS)
    }

    if (!value) {
      setNsfwAllowed(false)
      setBoards(filteredBoards)
    }
  }

  return (
    <nav className="bg-slate-400 sticky top-0 z-50">
      <div
        className="px-4"
      >
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link href="/" className="flex items-center py-4 px-2 hover:text-gray-900 transition duration-300 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span>kuroki.</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {boards.map(board => (
                <Link key={board.name} href={`/board/${board.name}`} className="py-4 px-2 hover:text-gray-900 transition duration-300">
                  /{board.name}/
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <ToggleSwitch
              falseText="SFW"
              trueText="NSFW"
              name="toggle-nsfw"
              onSwitch={handleAllowNsfw}
            />
            <div className="cursor-pointer py-4 px-3 hover:text-gray-900 transition duration-300">
              <a 
                className="flex items-center gap-2"
                href="https://github.com/splorg/kuroki-chan" 
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span className="hidden lg:inline">Source</span>
              </a>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              className="hover:text-gray-900 transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${mobileMenuVisible ? 'min-h-custom min-w-full absolute bg-slate-400' : 'hidden'} md:hidden`}>
        <div className="px-4 py-2 min-w-full">
          <div className="flex items-center gap-3">
            <input className="w-4 h-4" type="checkbox" name="toggle-nsfw" id="toggle-nsfw" onChange={e => handleAllowNsfw(e.target.checked)} />
            <label htmlFor="toggle-nsfw">{nsfwAllowed ? 'NSFW' : 'SFW'}</label>
          </div>
        </div>
        {boards.map(board => (
          <Link
            href={`/board/${board.name}`}
            key={board.name}
            className="cursor-pointer block py-2 px-4 text-sm hover:bg-slate-600 transition duration-300"
          >
            /{board.name}/
          </Link>
        ))}
        <a 
          className="flex py-2 px-4 text-sm items-center gap-2 hover:bg-slate-600 transition duration-300"
          href="https://github.com/splorg/kuroki-chan" 
          target="_blank"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <span>Source</span>
        </a>
      </div>
    </nav>
  )
}

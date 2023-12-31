import axios from 'axios'

import { notFound } from 'next/navigation'
import { extractBoardInfo } from '@/utils/extractBoardInfo'

import { Board, BoardList, Catalog, Thread } from './definitions'
import { ALLOWED_BOARDS, API_BASE_URL } from './constants'

const api = axios.create({
  baseURL: API_BASE_URL
})

export const getBoardInfo = async (board: string) => {
  const allowedBoardNames = ALLOWED_BOARDS.map(board => board.name)
  if (!allowedBoardNames.includes(board)) {
    notFound()
  }

  const { data } = await api.get<BoardList>('boards.json')

  const info = extractBoardInfo(data, board)

  return info
}

export const getBoard = async (board: string, page?: number) => {
  const allowedBoardNames = ALLOWED_BOARDS.map(board => board.name)
  if (!allowedBoardNames.includes(board)) {
    notFound()
  }

  const { data } = await api.get<Board>(`${board}/${page}.json`)

  return data.threads
}

export const getThread = async (board: string, id: number) => {
  try {
    const { data } = await api.get<Thread>(`${board}/thread/${id}.json`)
  
    return data
  } catch {
    notFound()
  }
}

export const getCatalog = async (board: string) => {
  const allowedBoardNames = ALLOWED_BOARDS.map(board => board.name)
  if (!allowedBoardNames.includes(board)) {
    notFound()
  }

  const { data } = await api.get<Catalog>(`${board}/catalog.json`)

  const onlyThreads = data.flatMap(page => page.threads)

  return onlyThreads
}

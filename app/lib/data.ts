import axios from 'axios'
import { Board, BoardList, Thread } from './definitions'
import { extractBoardInfo } from '@/utils/extractBoardInfo'

const BASE_URL = 'https://a.4cdn.org/'

const api = axios.create({
  baseURL: BASE_URL
})

export const getBoardInfo = async (board: string) => {
  const { data } = await api.get<BoardList>('boards.json')

  const info = extractBoardInfo(data, board)

  return info
}

export const getBoard = async (board: string, page?: number) => {
  page = page ? page : 1
  const { data } = await api.get<Board>(`${board}/${page}.json`)

  return data.threads
}

export const getThread = async (board: string, id: number) => {
  const { data } = await api.get<Thread>(`${board}/thread/${id}.json`)

  return data
}

import { create } from 'zustand'

type Store = {
  page: string
  board: string
  thread?: string
}

export const useStore = create<Store>((set) => ({
  page: '',
  board: '',
  thread: ''
}))
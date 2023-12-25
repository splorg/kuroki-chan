'use client'

import { useRef } from "react"

import { useStore } from "@/stores/store"

type Props = {
  page: string
  board: string
}

const StoreInitializer = ({ page, board }: Props) => {
  const initialized = useRef(false)

  if (!initialized.current) {
    useStore.setState({ page, board })
    initialized.current = true
  }
  
  return null
}

export default StoreInitializer
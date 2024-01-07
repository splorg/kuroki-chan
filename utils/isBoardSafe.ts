import { ALLOWED_BOARDS } from "@/app/lib/constants"

export const isBoardSafe = (boardName: string) => {
  const isSafe = ALLOWED_BOARDS.find(board => board.name === boardName)?.sfw

  return !!isSafe
}

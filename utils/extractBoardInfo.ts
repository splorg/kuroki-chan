import { BoardList } from "@/app/lib/definitions";

export const extractBoardInfo = (boardList: BoardList, targetBoard: string) => {
  const board = boardList.boards.find(b => b.board === targetBoard)

  const { title, pages, ws_board, meta_description } = board!

  return { title, pages, ws_board, meta_description }
}

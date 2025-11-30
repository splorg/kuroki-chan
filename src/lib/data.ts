"use server";

import { notFound } from "next/navigation";
import { ALLOWED_BOARDS, API_BASE_URL } from "./constants";
import type { Board, BoardList, Catalog, Thread } from "./types";

const extractBoardInfo = (boardList: BoardList, targetBoard: string) => {
  const board = boardList.boards.find((b) => b.board === targetBoard);

  if (!board) return null;

  const { title, pages, ws_board, meta_description } = board;

  return { title, pages, ws_board, meta_description };
};

export const getBoardInfo = async (board: string) => {
  const allowedBoardNames = ALLOWED_BOARDS.map((board) => board.name);

  if (!allowedBoardNames.includes(board)) {
    notFound();
  }

  const response = await fetch(`${API_BASE_URL}boards.json`);
  const data = (await response.json()) as BoardList;
  const info = extractBoardInfo(data, board);

  if (!info) notFound();

  return info;
};

export const getBoard = async (board: string, page?: number) => {
  const allowedBoardNames = ALLOWED_BOARDS.map((board) => board.name);

  if (!allowedBoardNames.includes(board)) {
    notFound();
  }

  const response = await fetch(`${API_BASE_URL}${board}/${page}.json`);
  const data = (await response.json()) as Board;

  return data.threads;
};

export const getThread = async (board: string, id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${board}/thread/${id}.json`);
    const data = (await response.json()) as Thread;

    return data;
  } catch {
    notFound();
  }
};

export const getCatalog = async (board: string) => {
  const allowedBoardNames = ALLOWED_BOARDS.map((board) => board.name);

  if (!allowedBoardNames.includes(board)) {
    notFound();
  }

  const response = await fetch(`${API_BASE_URL}${board}/catalog.json`);
  const data = (await response.json()) as Catalog;
  const onlyThreads = data.flatMap((page) => page.threads);

  return onlyThreads;
};

import { CDN_BASE_URL } from "../../lib/constants"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const board = searchParams.get('board')
  const tim = searchParams.get('tim')

  const res = await fetch(`${CDN_BASE_URL}/${board}/${tim}s.jpg`, { cache: 'no-store' })

  return res
}

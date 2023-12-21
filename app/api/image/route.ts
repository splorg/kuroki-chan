import axios from "axios"

import { CDN_BASE_URL } from "../../lib/constants"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const board = searchParams.get('board')
  const tim = searchParams.get('tim')
  const ext = searchParams.get('ext')

  const res = await axios.get(`${CDN_BASE_URL}/${board}/${tim}${ext}`, {
    responseType: 'arraybuffer'
  })

  const resHeaders = new Headers({
    'Content-Type': res.headers['Content-Type'] as string
  })

  return new Response(res.data, { headers: resHeaders })
}

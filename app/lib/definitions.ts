export type Board = {
  threads: Thread[]
}

export type Thread = {
  posts: Post[]
}

export type Post = {
  no: number
  sticky?: number
  closed?: number
  now: string
  name: string
  com: string
  filename?: string
  ext?: string
  w?: number
  h?: number
  tn_w?: number
  tn_h?: number
  tim?: number
  time: number
  md5?: string
  fsize?: number
  resto: number
  capcode?: string
  semantic_url?: string
  custom_spoiler?: number
  replies?: number
  images?: number
  sub?: string
  bumplimit?: number
  imagelimit?: number
  omitted_posts?: number
  omitted_images?: number
  tail_size?: number
}

export type BoardList = {
  boards: {
    board: string
    title: string
    ws_board: number
    per_page: number
    pages: number
    max_filesize: number
    max_webm_filesize: number
    max_comment_chars: number
    max_webm_duration: number
    bump_limit: number
    image_limit: number
    cooldowns: {
      threads: number
      replies: number
      images: number
    }
    meta_description: string
    is_archived?: number
    spoilers?: number
    custom_spoilers?: number
    user_ids?: number
    country_flags?: number
    code_tags?: number
    webm_audio?: number
    min_image_width?: number
    min_image_height?: number
    oekaki?: number
    sjis_tags?: number
    board_flags?: Record<string, string>
    text_only?: number
    require_subject?: number
    math_tags?: number
  }[]
}

export type Catalog = {
  page: number
  threads: {
    no: number
    sticky?: number
    closed?: number
    now: string
    name: string
    sub?: string
    com: string
    filename: string
    ext: string
    w: number
    h: number
    tn_w: number
    tn_h: number
    tim: number
    time: number
    md5: string
    fsize: number
    resto: number
    capcode?: string
    semantic_url: string
    replies: number
    images: number
    omitted_posts: number
    omitted_images: number
    last_replies: {
      no: number
      now: string
      name: string
      com: string
      filename?: string
      ext?: string
      w?: number
      h?: number
      tn_w?: number
      tn_h?: number
      tim?: number
      time: number
      md5?: string
      fsize?: number
      resto: number
      capcode?: string
    }[]
    last_modified: number
    bumplimit?: number
    imagelimit?: number
  }[]
}[]
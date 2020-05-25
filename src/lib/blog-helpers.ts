import { post } from '../types/post'

export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`
}

// return "YYYY/MM/DD"
export const getDateStr = (date: number) => {
  return new Date(date).toISOString().split('T')[0]
}

export const normalizeSlug = (slug: string): any => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}

// 取得したデータをpost型にする
export const dataToPosts = (postData: any[]) => {
  const posts: post[] = postData.map(data => {
    return dataToPost(data)
  })
  return posts
}

export const dataToPost = (data: any) => {
  const id: string | null = data.id ?? null
  const link: string | null = data.Link ?? null
  const tags: string[] = data.Tags
  const slug: string = data.Slug
  const date: number = data.Date
  const authors: string[] = data.Authors
  const published: boolean = data.Published
  const page: string = data.Page
  const preview: any = null
  const content: object[] = data.content ?? null

  const post: post = {
    id,
    link,
    tags,
    slug,
    date,
    authors,
    published,
    page,
    preview,
    content,
  }
  return post
}

/**
 * 階層構造のjsonから値を取得する
 * @param obj
 */
export const seekValue = (obj: any): string => {
  if (typeof obj === 'object') {
    var strValue = ''
    for (const key in obj) {
      strValue += seekValue(obj[key])
    }
    return strValue
  } else {
    return obj
  }
}

import { post } from 'types/post'

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

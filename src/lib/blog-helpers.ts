export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`
}

// return "YYYY-MM-DD"
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

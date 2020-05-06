export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`
}

// YYYY/MM/DD
export const getDateStr = date => {
  return new Date(date).toLocaleString().substr(0, 10)
}

export const normalizeSlug = slug => {
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

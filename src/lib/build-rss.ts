import { resolve } from 'path'
import { writeFile } from './fs-helpers'
import { renderToStaticMarkup } from 'react-dom/server'

import { textBlock } from './notion/renderers'
import getBlogIndex from './notion/getBlogIndex'
import getNotionUsers from './notion/getNotionUsers'
import { getBlogLink } from './blog-helpers'

import { post } from '../types/post'

// must use weird syntax to bypass auto replacing of NODE_ENV
process.env['NODE' + '_ENV'] = 'production'
process.env.USE_CACHE = 'true'

// constants
const NOW = new Date().toJSON()

function mapToAuthor(author: any): string {
  return `<author><name>${author.full_name}</name></author>`
}

function decode(string: string): string {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// TODO 直す
function mapToEntry(post: any) {
  return `
    <entry>
      <id>${post.link}</id>
      <title>${decode(post.title)}</title>
      <link href="${post.link}"/>
      <updated>${new Date(post.date).toJSON()}</updated>
      <content type="xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${renderToStaticMarkup(
            post.preview
              ? (post.preview || []).map((block: any, idx: any) =>
                  textBlock(block, false, post.title + idx)
                )
              : post.content
          )}
          <p class="more">
            <a href="${post.link}">Read more</a>
          </p>
        </div>
      </content>
      ${(post.authors || []).map(mapToAuthor).join('\n      ')}
    </entry>`
}

function concat(total: any, item: any) {
  return total + item
}

function createRSS(blogPosts: any[] = []) {
  const postsString = blogPosts.map(mapToEntry).reduce(concat, '')

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>My Blog</title>
    <subtitle>Blog</subtitle>
    <link href="/atom" rel="self" type="application/rss+xml"/>
    <link href="/" />
    <updated>${NOW}</updated>
    <id>My Notion Blog</id>${postsString}
  </feed>`
}

// TODO 代入しまくりを直す
async function main() {
  const postsTable = await getBlogIndex(true)
  const neededAuthors = new Set<string>()

  const blogPosts = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      if (!post.Published) return

      post.authors = post.Authors || []

      for (const author of post.authors) {
        neededAuthors.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...neededAuthors])

  blogPosts.forEach(post => {
    post.authors = post.authors.map((id: any) => users[id])
    post.link = getBlogLink(post.Slug)
    post.title = post.Page
    post.date = post.Date
  })

  const outputPath = './public/atom'
  await writeFile(resolve(outputPath), createRSS(blogPosts))
  console.log(`Atom feed file generated at \`${outputPath}\``)
}

main().catch(error => console.error(error))

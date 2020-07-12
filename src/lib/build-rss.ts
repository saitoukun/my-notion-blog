import { resolve } from 'path'
import { writeFile } from './fs-helpers'
import { renderToStaticMarkup } from 'react-dom/server'
import getBlogIndex from './notion/getBlogIndex'
import getNotionUsers from './notion/getNotionUsers'
import { getBlogLink } from './blog-helpers'
import { getPosts } from 'lib/notion/getPosts'
import { post } from 'types/post'

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

function mapToEntry(post: post) {
  const link = getBlogLink(post.slug)
  return `
    <entry>
      <id>${link}</id>
      <title>${decode(post.page)}</title>
      <link href="${post.link}"/>
      <updated>${new Date(post.date).toJSON()}</updated>
      <content type="xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <p class="more">
            <a href="${link}">Read more</a>
          </p>
        </div>
      </content>
      ${(post.authors || []).map(mapToAuthor).join('\n      ')}
    </entry>`
}

function concat(total: any, item: any) {
  return total + item
}

function createRSS(posts: post[] = []) {
  const postsString = posts.map(mapToEntry).reduce(concat, '')

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

async function main() {
  const posts = await getPosts()
  const outputPath = './public/atom'
  await writeFile(resolve(outputPath), createRSS(posts))
  console.log(`Atom feed file generated at \`${outputPath}\``)
}

main().catch(error => console.error(error))

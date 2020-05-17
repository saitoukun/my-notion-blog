import { GetStaticProps } from 'next'
import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import { getBlogLink, getDateStr, dataToPosts } from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { post } from '../../types/post'

/**
 * Static Generation with Notion
 */
export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const postsData: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !post.Published) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  postsData.map(post => {
    post.Authors = post.Authors.map((id: any) => users[id].full_name)
  })

  // Sort posts by date
  postsData.sort((a: any, b: any) => {
    if (a.Date < b.Date) {
      return 1
    } else {
      return -1
    }
  })

  //objectをpost型にする
  const posts: post[] = dataToPosts(postsData)
  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts, preview }: { posts: post[]; preview: any }) => {
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>My Notion Blog</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map(post => {
          return (
            <div className={blogStyles.postPreview} key={post.slug}>
              <h3>
                <Link href="/blog/[slug]" as={getBlogLink(post.slug)}>
                  <div className={blogStyles.titleContainer}>
                    {!post.published && (
                      <span className={blogStyles.draftBadge}>Draft</span>
                    )}
                    <a>{post.page}</a>
                  </div>
                </Link>
              </h3>
              {post.authors.length > 0 && (
                <div className="authors">By: {post.authors.join(' ')}</div>
              )}
              {post.date && (
                <div className="posted">Posted: {getDateStr(post.date)}</div>
              )}
              <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block: any, idx: string) =>
                  textBlock(block, true, `${post.slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

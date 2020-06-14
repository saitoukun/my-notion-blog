import { GetStaticProps } from 'next'
import Link from 'next/link'
import Header from 'components/header'

import blogStyles from 'styles/blog.module.css'
import sharedStyles from 'styles/shared.module.css'

import { getPosts } from 'lib/notion/getPosts'
import { post } from 'types/post'
import { PostCell } from 'components/PostCell' 

/**s
 * Static Generation with Notion
 */
export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const posts = await getPosts()

  return {
    props: {
      preview: preview || false,
      posts,
    },
    unstable_revalidate: 10,
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
            <PostCell post={post}/>
          )  
        })}
      </div>
    </>
  )
}

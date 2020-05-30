import { GetStaticProps } from 'next'
import Link from 'next/link'
import Header from 'components/header'
import { getSortedPostsData } from 'lib/markdownPosts'
import blogStyles from 'styles/blog.module.css'
import sharedStyles from 'styles/shared.module.css'
import { mdPost } from 'types/mdPost'

/**
 * Static Generation with MarkDown
 */
export const getStaticProps: GetStaticProps = async () => {
  const posts: mdPost[] = getSortedPostsData()
  return {
    props: {
      posts,
    },
  }
}

export default ({ posts }: { posts: mdPost[] }) => {
  return (
    <>
      <Header titlePre="Blog" />
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>My Posts</h1>
        {posts.map(post => (
          <div className={blogStyles.postPreview} key={post.id}>
            <h3>
              <Link href="/post/[id]" as={`/post/${post.id}`}>
                <div className={blogStyles.titleContainer}>
                  <a>{post.title}</a>
                </div>
              </Link>
            </h3>
            <div className="posted">Posted: {post.date}</div>
          </div>
        ))}
      </div>
    </>
  )
}

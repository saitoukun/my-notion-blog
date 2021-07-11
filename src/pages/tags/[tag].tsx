import { GetStaticProps, GetStaticPaths } from 'next'
import Header from 'components/header'
import blogStyles from 'styles/blog.module.css'
import { getPosts, flattenDeep } from 'lib/notion/getPosts'
import { post } from 'types/post'
import { PostCell } from 'components/PostCell'

/**
 * Static Generation with Notion
 */
export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const tag: string = params!.tag as string
  //postsを取得
  const posts: post[] = await getPosts()
  const tagPosts = posts.filter((post) => post.tags.includes(tag))

  return {
    props: {
      posts: tagPosts,
      tag,
    },
    revalidate: 10,
  }
}

/**
 * Dynamic Routes
 * /tags/[tag]
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts: post[] = await getPosts()

  const tagsArray = posts.map(function (post) {
    return post.tags
  })

  //再帰的に平坦化
  const fratTags = flattenDeep(tagsArray)
  const uniqTags = Array.from(new Set(fratTags))

  const paths = uniqTags.map((tag) => {
    return `/tags/${tag}`
  })

  return {
    paths: paths,
    fallback: false,
  }
}

const tag = ({ posts = [], tag }: { posts: post[]; tag: string }) => {
  return (
    <>
      <Header titlePre="Tags" />
      <div className={blogStyles.blogIndex}>
        <h1>{tag}</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post) => {
          return <PostCell post={post} key={post.slug} />
        })}
      </div>
      <style jsx>
        {`
          h1,
          h2 {
            text-align: center;
          }
        `}
      </style>
    </>
  )
}
export default tag

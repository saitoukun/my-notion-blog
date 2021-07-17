import { GetStaticProps } from 'next'
import Header from 'components/header'
import blogStyles from 'styles/blog.module.css'
import { getPosts } from 'lib/notion/getPosts'
import { post } from 'types/post'
import { PostCell } from 'components/PostCell'
import { BlockMapType } from 'react-notion'

/**
 * Static Generation
 */
export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const posts = await getPosts()

  return {
    props: {
      posts,
    }
  }
}

const index = ({ posts }: { posts: post[] }) => {
  return (
    <>
      <Header titlePre="Blog" />
      <div className={'layout blogIndex'}>
        <h1>My Notion Blog</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post) => {
          return <PostCell post={post} key={post.slug} />
        })}
      </div>

      <style jsx global>{`
        .layout img {
          margin: auto;
          max-width: 98%;
          display: block;
          height: auto;
        }

        .layout h1,
        .layout h2 {
          text-align: center;
        }

        .blogIndex {
          padding: 0 5%;
        }

        .blogIndex h1 {
          margin-bottom: 50px;
        }
      `}</style>
    </>
  )
}
export default index

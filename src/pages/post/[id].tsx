import { GetStaticProps, GetStaticPaths } from 'next'
import Header from 'components/header'
import { getAllPostIds, getPostData } from 'lib/markdownPosts'
import blogStyles from 'styles/blog.module.css'
import { mdPost } from 'types/mdPost'

/**
 * Static Generation
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post: mdPost = await getPostData(params!.id as string)
  return {
    props: {
      post,
    },
  }
}

/**
 * Dynamic Routes
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

const RenderMarkdownPost: React.FC<{ post: mdPost }> = ({ post }) => {
  //TODO tag機能
  const tags = post.tags.map(tag => <a key={tag}>{tag} </a>)

  return (
    <>
      <Header titlePre={post.title} />
      <div className={blogStyles.post}>
        <h1> {post.title} </h1>
        <div className="posted">Posted: {post.date}</div>
        <div className="tags">{tags}</div>

        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
    </>
  )
}
export default RenderMarkdownPost

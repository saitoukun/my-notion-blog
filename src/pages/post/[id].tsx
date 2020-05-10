import Link from 'next/link'
import Header from '../../components/header'
import { getAllPostIds, getPostData } from '../../lib/markdownPosts'
import blogStyles from '../../styles/blog.module.css'
import { mdPost } from '../../types/mdPost'

/**
 * Static Generation
 */
export async function getStaticProps({ params }) {
  const post = await getPostData(params.id)
  return {
    props: {
      post,
    },
  }
}

/**
 * Dynamic Routes
 */
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

const RenderMarkdownPost: React.FC<{ post: mdPost }> = ({ post }) => {
  const tags = post.tags.map((tag, index) => <a key={tag}>{tag} </a>)

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

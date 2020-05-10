import Link from 'next/link'
import Header from '../../components/header'
import { getSortedPostsData } from '../../lib/markdownPosts'
import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

/**
 * Static Generation with MarkDown
 */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default ({ allPostsData }) => {
  return (
    <>
      <Header titlePre="Blog" />
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>My Posts</h1>
        {allPostsData.map(({ id, date, title }) => (
          <div className={blogStyles.postPreview} key={id}>
            <h3>
              <Link href="/post/[id]" as={`/post/${id}`}>
                <div className={blogStyles.titleContainer}>
                  <a>{title}</a>
                </div>
              </Link>
            </h3>
            <div className="posted">Posted: {date}</div>
          </div>
        ))}
      </div>
    </>
  )
}

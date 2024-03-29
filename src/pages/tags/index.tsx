import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Header from 'components/header'
import blogStyles from 'styles/blog.module.css'
import { getPosts, flattenDeep } from 'lib/notion/getPosts'
import { post } from 'types/post'

/**
 * Static Generation with Notion
 */
export const getStaticProps: GetStaticProps = async () => {
  const posts: post[] = await getPosts()

  const tagsArray = posts.map(function (post) {
    return post.tags
  })
  const fratTags = flattenDeep(tagsArray)
  const uniqTags = Array.from(new Set(fratTags))

  return {
    props: {
      tags: uniqTags,
    }
  }
}

const index = ({ tags }: { tags: string[] }) => {
  return (
    <>
      　<Header titlePre="Tags" />
      <div className={blogStyles.blogIndex}>
        <h1>Tags</h1>
        {tags.length === 0 && (
          <p className={blogStyles.noPosts}>There are no tagss yet</p>
        )}
        {tags.map((tag) => {
          return (
            <div className={blogStyles.postPreview} key={tag}>
              <h3>
                <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                  <div className={blogStyles.titleContainer}>
                    <a>{tag}</a>
                  </div>
                </Link>
              </h3>
            </div>
          )
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
export default index

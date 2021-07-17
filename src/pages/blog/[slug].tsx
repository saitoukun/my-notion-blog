import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from 'components/header'
import blogStyles from 'styles/blog.module.css'
import React, { useEffect } from 'react'
import getBlogIndex from 'lib/notion/getBlogIndex'
import { getPost } from 'lib/notion/getPosts'
import { getBlogLink, getDateStr } from 'lib/blog-helpers'
import { post } from 'types/post'

import { NotionRenderer, BlockMapType } from 'react-notion'

/**
 * Static Generation
 */
export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const slug: string = params!.slug as string
  const post: post | null = await getPost(slug, preview).catch(
    (error: Error) => {
      console.log(error.message)
      return null
    }
  )

  const props = post
    ? {
        post,
        preview: preview || false,
      }
    : {
        redirect: '/blog',
        preview: false,
      }

  return {
    props
  }
}

/**
 * Dynamic Routes
 * /blog/[slug]
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones
  return {
    paths: Object.keys(postsTable)
      .filter((post) => postsTable[post].Published)
      .map((slug) => getBlogLink(slug)),
    fallback: false,
  }
}

const RenderPost: React.FC<{ post: post; redirect: any; preview: any }> = ({
  post,
  redirect,
  preview,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [redirect, post])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!post) {
    return (
      <div className={blogStyles.post}>
        <p>
          Woops! didn't find that post, redirecting you back to the blog index
        </p>
      </div>
    )
  }

  return (
    <>
      <Header titlePre={post.page} />
      <TitleBlock post={post} />
      <TocBlock post={post} />
      <PageBlock post={post} />
    </>
  )
}
export default RenderPost

const TitleBlock: React.FC<{ post: post }> = ({ post }) => (
  <>
    <div className={blogStyles.post}>
      <h1>{post.page || ''}</h1>
      {post.authors && (
        <div className="authors">By: {post.authors.join(' ')}</div>
      )}
      {post.date && (
        <div className="posted">Posted: {getDateStr(post.date)}</div>
      )}
      {post.tags && (
        <div className="tags">
          Tags:
          {post.tags.map((tag) => {
            return (
              <>
                <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                  <div className={blogStyles.titleContainer}>
                    <a>{tag}</a>,
                  </div>
                </Link>
              </>
            )
          })}
        </div>
      )}
      <hr />
    </div>
  </>
)

//TODO Table of Contentsを作る
const TocBlock: React.FC<{ post: post }> = ({ post }) => {
  return <></>
}

const PageBlock: React.FC<{ post: post }> = ({ post }) => {
  if (!post.content) {
    return <p>This post has no content</p>
  }

  const blockMap: BlockMapType = post.content
  return (
    <div className="notion-page notion-page-offset">
      <NotionRenderer blockMap={blockMap} />
    </div>
  )
}

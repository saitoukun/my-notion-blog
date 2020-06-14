import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from 'components/header'
import Heading from 'components/heading'
import components from 'components/dynamic'
import ExtLink from 'components/ext-link'
import ReactJSXParser from '@zeit/react-jsx-parser'
import blogStyles from 'styles/blog.module.css'
import { textBlock } from 'lib/notion/renderers'
import React, { CSSProperties, useEffect } from 'react'
import getBlogIndex from 'lib/notion/getBlogIndex'
import { getPost } from 'lib/notion/getPosts'
import { getBlogLink, getDateStr, seekValue } from 'lib/blog-helpers'
import { post } from 'types/post'

/**
 * Static Generation
 */
export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const slug: string = params!.slug as string
  const post: post | null = await getPost(slug, preview)
    .catch((error: Error) => {
      console.log(error.message)
      return null
    })

  const props = post ? {
    post,
    preview: preview || false
  } : {
    redirect: '/blog',
    preview: false,
  }

  return {
    props,
    unstable_revalidate: 5
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
      .filter(post => postsTable[post].Published)
      .map(slug => getBlogLink(slug)),
    fallback: true,
  }
}

//notionのpostをDOMにする
const RenderPost: React.FC<{ post: post; redirect: any; preview: any }> = ({
  post,
  redirect,
  preview,
}) => {
  const router = useRouter()

  useEffect(() => {
    const twitterSrc = 'https://platform.twitter.com/widgets.js'
    // make sure to initialize any new widgets loading on
    // client navigation
    if (post && post.hasTweet) {
      if ((window as any)?.twttr?.widgets) {
        ; (window as any).twttr.widgets.load()
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement('script')
        script.async = true
        script.src = twitterSrc
        const body = document.querySelector('body') as HTMLBodyElement
        body.appendChild(script)
      }
    }
  }, [])
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
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview?slug=${post.slug}`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={blogStyles.post}>
        <TitleBlock post={post} />
        <PageBlock post={post} />
      </div>
    </>
  )
}
export default RenderPost

const TitleBlock: React.FC<{ post: post }> = ({ post }) => (
  <>
    <h1>{post.page || ''}</h1>
    {post.authors && (
      <div className="authors">By: {post.authors.join(' ')}</div>
    )}
    {post.date && <div className="posted">Posted: {getDateStr(post.date)}</div>}
    {post.tags && <div className="tags">Tags:
      {(post.tags || []).map(tag => {
      return (
        <>
          <Link href="/tags/[tag]" as={`/tags/${tag}`}>
              <div className={blogStyles.titleContainer}>
                <a>{tag}</a>
                ,
              </div>
          </Link>
        </>
      )
    })}
    </div>
    }

    <hr />
  </>
)

const PageBlock: React.FC<{ post: post }> = ({ post }) => {
  const listTypes = new Set(['bulleted_list', 'numbered_list'])
  let listTagName: string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}
  return (
    <>
      {(!post.content || post.content.length === 0) && (
        <p>This post has no content</p>
      )}

      {(post.content || []).map((block: any, blockIdx: number) => {
        // post.contentを全部回す
        const { value } = block
        const { type, properties, id, parent_id } = value
        const isLast = blockIdx === post.content.length - 1
        const isList = listTypes.has(type)
        let toRender = []

        if (isList) {
          listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol']
          listLastId = `list${id}`

          listMap[id] = {
            key: id,
            nested: [],
            children: textBlock(properties.title, true, id),
          }

          if (listMap[parent_id]) {
            listMap[id].isNested = true
            listMap[parent_id].nested.push(id)
          }
        }

        if (listTagName && (isLast || !isList)) {
          toRender.push(
            React.createElement(
              listTagName,
              { key: listLastId! },
              Object.keys(listMap).map(itemId => {
                if (listMap[itemId].isNested) return null

                const createEl = (item: any) =>
                  React.createElement(
                    components.li || 'ul',
                    { key: item.key },
                    item.children,
                    item.nested.length > 0
                      ? React.createElement(
                        components.ul || 'ul',
                        { key: item + 'sub-list' },
                        item.nested.map((nestedId: string) =>
                          createEl(listMap[nestedId])
                        )
                      )
                      : null
                  )
                return createEl(listMap[itemId])
              })
            )
          )
          listMap = {}
          listLastId = null
          listTagName = null
        }

        //Typeごとに変換する
        const renderHeading = (Type: string | React.ComponentType) => {
          toRender.push(
            <Heading key={id}>
              <Type key={id}>{textBlock(properties.title, true, id)}</Type>
            </Heading>
          )
        }

        switch (type) {
          case 'table_of_contents':

          case 'page':
          case 'bookmark':
            if (properties) {
              const link: string = seekValue(properties.link)
              let title: string = seekValue(properties.title)

              if (!title) {
                //ドメインだけ取得
                title = link.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)![1]
              }
              toRender.push(
                <p>
                  
                  <ExtLink
                    key={id}
                    href={link}
                    style={{ color: 'inherit' }}
                  >
                    {title}
                  </ExtLink>
                </p>
              )
            }
            break

          case 'divider':
            break
          case 'text':
            if (properties) {
              toRender.push(textBlock(properties.title, false, id))
            }
            break

          //TODO 混ざってるので分離する
          case 'image':
          case 'video':
          case 'embed': {
            const { format = {} } = value
            const {
              block_width,
              block_height,
              display_source,
              block_aspect_ratio,
            } = format
            const baseBlockWidth = 768
            const roundFactor = Math.pow(10, 2)
            // calculate percentages
            const width = block_width
              ? `${Math.round(
                (block_width / baseBlockWidth) * 100 * roundFactor
              ) / roundFactor}%`
              : block_height || '100%'

            const isImage = type === 'image'
            const Comp = isImage ? 'img' : 'video'
            const useWrapper = block_aspect_ratio && !block_height
            const childStyle: CSSProperties = useWrapper
              ? {
                width: '100%',
                height: '100%',
                border: 'none',
                position: 'absolute',
                top: 0,
              }
              : {
                width,
                border: 'none',
                height: 'auto',
                display: 'block',
                maxWidth: '100%',
              }

            let child = null

            if (!isImage && !value.file_ids) {
              // external resource use iframe
              child = (
                <iframe
                  style={childStyle}
                  src={display_source}
                  key={!useWrapper ? id : undefined}
                  className={!useWrapper ? 'asset-wrapper' : undefined}
                />
              )
            } else {
              // notion resource
              child = (
                <Comp
                  key={!useWrapper ? id : undefined}
                  src={`/api/asset?assetUrl=${encodeURIComponent(
                    display_source as any
                  )}&blockId=${id}`}
                  controls={!isImage}
                  alt={`An ${isImage ? 'image' : 'video'} from Notion`}
                  loop={!isImage}
                  muted={!isImage}
                  autoPlay={!isImage}
                  style={childStyle}
                />
              )
            }

            toRender.push(
              useWrapper ? (
                <div
                  style={{
                    paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
                    position: 'relative',
                  }}
                  className="asset-wrapper"
                  key={id}
                >
                  {child}
                </div>
              ) : (
                  child
                )
            )
            break
          }
          case 'header':
            renderHeading('h1')
            break
          case 'sub_header':
            renderHeading('h2')
            break
          case 'sub_sub_header':
            renderHeading('h3')
            break
          case 'code': {
            if (properties.title) {
              const content = properties.title[0][0]
              const language = properties.language[0][0]

              if (language === 'LiveScript') {
                // this requires the DOM for now
                toRender.push(
                  <ReactJSXParser
                    key={id}
                    jsx={content}
                    components={components}
                    componentsOnly={false}
                    renderInpost={false}
                    allowUnknownElements={true}
                    blacklistedTags={['script', 'style']}
                  />
                )
              } else {
                toRender.push(
                  <components.Code key={id} language={language || ''}>
                    {content}
                  </components.Code>
                )
              }
            }
            break
          }
          case 'quote': {
            if (properties.title) {
              toRender.push(
                React.createElement(
                  components.blockquote,
                  { key: id },
                  properties.title
                )
              )
            }
            break
          }
          case 'callout': {
            toRender.push(
              <div className="callout" key={id}>
                {value.format?.page_icon && (
                  <div>{value.format?.page_icon}</div>
                )}
                <div className="text">
                  {textBlock(properties.title, true, id)}
                </div>
              </div>
            )
            break
          }
          case 'tweet': {
            if (properties.html) {
              toRender.push(
                <div
                  dangerouslySetInnerHTML={{ __html: properties.html }}
                  key={id}
                />
              )
            }
            break
          }
          default:
            if (process.env.NODE_ENV !== 'production' && !listTypes.has(type)) {
              console.log('unknown type', type)
            }
            break
        }
        return toRender
      })}
    </>
  )
}

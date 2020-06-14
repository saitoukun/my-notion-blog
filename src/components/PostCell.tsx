
import Link from 'next/link'
import { post } from 'types/post'

import blogStyles from 'styles/blog.module.css'
import { getBlogLink, getDateStr } from 'lib/blog-helpers'

export const PostCell: React.FC<{ post: post }> = ({ post }) =>{
    return (
        <div className={blogStyles.postPreview} key={post.slug}>
          <h3>
            <Link href="/blog/[slug]" as={getBlogLink(post.slug)}>
              <div className={blogStyles.titleContainer}>
                {!post.published && (
                  <span className={blogStyles.draftBadge}>Draft</span>
                )}
                <a>{post.page}</a>
              </div>
            </Link>
          </h3>
          {post.authors.length > 0 && (
            <div className="authors">By: {post.authors.join(' ')}</div>
          )}
          {post.date && (
            <div className="posted">Posted: {getDateStr(post.date)}</div>
          )}
        </div>
      )
}
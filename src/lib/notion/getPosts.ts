import getNotionUsers from 'lib/notion/getNotionUsers'
import getBlogIndex from 'lib/notion/getBlogIndex'
import {getPageData, getPageId } from 'lib/notion/getPageData'
import { post } from 'types/post'
import { BlockMapType } from "react-notion";

//有効なpostsを返す
export const getPosts = async (): Promise<post[]> => {

    /** example
    start: {
    id: 'c6b95ed3-b130-4acf-a4bc-fab932473a99',
    Link: null,
    Tags: 'Notion-blog,Programming',
    Slug: 'start',
    Date: 1580482800194,
    Authors: [ '3da3d4b6-346e-4a3e-b998-ea7eb4815766' ],
    Published: true,
    Page: 'Notion-blogの手順とその問題',
    preview: []
    },
     */
    //slugをキーにしたobject
    const postsTable = await getBlogIndex()
    const authorsToGet: Set<string> = new Set()
    const postsData: any[] = Object.keys(postsTable)
        .map(slug => {
            const post = postsTable[slug]
            // remove draft posts in production
            if (!post.Published) {
                return null
            }
            post.Authors = post.Authors || []
            for (const author of post.Authors) {
                authorsToGet.add(author)
            }
            return post
        })
        .filter(Boolean)
    const { users } = await getNotionUsers([...authorsToGet])

    postsData.map(post => {
        post.Authors = post.Authors.map((id: any) => users[id].full_name)
    })

    // Sort posts by date
    postsData.sort((a: any, b: any) => {
        if (a.Date < b.Date) {
            return 1
        } else {
            return -1
        }
    })

    //objectをpost型にする
    const posts: post[] = dataToPosts(postsData)

    return posts
}

export const getPost = async (slug: string, preview: any): Promise<post> => {
    // load the postsTable so that we can get the page's ID
    const postsTable = await getBlogIndex()
    const data: any = postsTable[slug]
    // if we can't find the post or if it is unpublished and
    // viewed without preview mode then we just redirect to /blog
    if (!data || (!data.Published && !preview)) {
        //throw new Error(`Failed to find post for slug: ${slug}`)
    }
    
    let pageId = ""
    if ( data.Link ) {
        pageId = getPageId(data.Link)
    } else {
        pageId = data.id
    }
    const blockMap = await getPageData(pageId)
    data.content = blockMap
    
    const { users } = await getNotionUsers(data.Authors || [])
    data.Authors = Object.keys(users).map(id => users[id].full_name)

    const post: post = dataToPost(data)
    return post
}

//配列を再帰的に平坦化する
export const flattenDeep = (arr: any[]): any[] => {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

// 取得したデータをpost型にする
const dataToPosts = (postData: any[]): post[] => {
    const posts = postData.map(data => {
        return dataToPost(data)
    })
    return posts
}

const dataToPost = (data: any): post => {
    const id: string | undefined = data.id ?? undefined
    const link: string | undefined = data.Link ?? undefined
    const tags: string[] = data.Tags.split(',');
    const slug: string = data.Slug
    const date: number = data.Date
    const authors: string[] = data.Authors
    const published: boolean = data.Published
    const page: string = data.Page
    const content: BlockMapType = data.content ?? undefined

    const post: post = {
        tags,
        slug,
        date,
        authors,
        published,
        page,
    }
    if(id){ post.id = id }
    if(link){ post.link = link }
    if(content){ post.content = content }

    return post
}

/**
 * example
 {  
    id: 'example74-85f7-41f2-91d9-233767example',
    Link: 'https://www.notion.so/example-examplef177e24d94a47295292bexample',
    Tag: 'vlog,Programming',
    Slug: 'exampleSlug',
    Date: 1587913200183,
    Authors: [ 'exampleb6-346e-4a3e-b998-ea7eb4example' ],
    Published: true,
    Page: 'example page',
    preview: []
  }
 */
export type post = {
  id: string
  Link: string
  Tags: string[]
  Slug: string
  Date: number
  Authors: string[]
  Published: boolean
  Page: string
  preview: any
  content: any
  hasTweet?: boolean
}

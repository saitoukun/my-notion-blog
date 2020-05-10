/**
 * example
 {
  id: 'example',
  contentHtml: '<h2>html</h2>\n' +
    '<p>example text</p>\n'
  title: 'example title',
  date: '2020/05/06',
  tags: 'Next.js,notion-blog'
  }
*/
export type mdPost = {
  id: string
  contentHtml: string | null
  title: string
  date: string
  tags: string[]
}

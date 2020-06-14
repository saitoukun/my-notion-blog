import rpc, { values } from './rpc'
import { post } from 'types/post'

//pageIdから中のコンテンツをとる
// TODO dataとpostをどう安全に扱うかの検討
export default async function getPageData(data: any) {
  const pageId = getPageId(data)
  try {
    const chunk = await loadPageChunk({ pageId })
    const blocks = values(chunk.recordMap.block)
    //先頭のblockはページの階層などを含むので除く
    if (blocks[0] && blocks[0].value.content) {
      if (data.Link) {
        //Linkの場合は階層も含んでしまう
        blocks.splice(0, 6)
      } else {
        // remove table blocks
        blocks.splice(0, 3)
      }
    }
    
    return { blocks }
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err)
    return { blocks: [] }
  }
}

export function loadPageChunk({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false,
}: any) {
  return rpc('loadPageChunk', {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns,
  })
}

//linkがあればlinkからidを取得。なければpageのidを取得。
function getPageId(data: any) {
  if (data.Link) {
    // urlの末32文字を次のようにハイフン区切りしたのがpageid
    // {8} - {4} - {4} - {4} - {12}
    const len = data.Link.length
    const idSize = 32
    const id = data.Link.substr(len - idSize, len)
    const sep = '-'
    const pageId =
      id.substr(0, 8) +
      sep +
      id.substr(8, 4) +
      sep +
      id.substr(12, 4) +
      sep +
      id.substr(16, 4) +
      sep +
      id.substr(20, 12)
    return pageId
  } else {
    return data.id
  }
}

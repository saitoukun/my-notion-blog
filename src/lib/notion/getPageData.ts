import rpc, { values } from './rpc'
import { post } from 'types/post'
import { BlockMapType } from "react-notion";

//pageIdから中のコンテンツをとる
export const getPageData = async (pageId: string): Promise<BlockMapType | undefined> => {
  try {
    const chunk = await loadPageChunk({ pageId })
    const blocks: BlockMapType = chunk.recordMap.block
    
    return blocks
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err)
    return undefined
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
export function getPageId(link: string): string {
    // urlの末32文字を次のようにハイフン区切りしたのがpageid
    // {8} - {4} - {4} - {4} - {12}
    const len = link.length
    const idSize = 32
    const id = link.substr(len - idSize, len)
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
}

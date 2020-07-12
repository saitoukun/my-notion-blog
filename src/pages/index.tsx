import { GetStaticProps } from 'next'
import Header from 'components/header'
import { getPageData, getPageId } from 'lib/notion/getPageData'
import { NotionRenderer, BlockMapType } from "react-notion";
import { BLOG_HOME_NOTION_URL, BLOG_PROFILE_NOTION_URL } from 'lib/notion/server-constants'

/**
 * Static Generation with Notion
 */
export const getStaticProps: GetStaticProps = async () => {
  if (!BLOG_HOME_NOTION_URL || !BLOG_PROFILE_NOTION_URL) return { props: {} }

  const homePageId = getPageId(BLOG_HOME_NOTION_URL)
  const homeBlockMap = await getPageData(homePageId)

  const profilePageId = getPageId(BLOG_PROFILE_NOTION_URL)
  const profileBlockMap = await getPageData(profilePageId)

  if (!homeBlockMap || !profileBlockMap) return { props: {} }
  
  return {
    props: {
      homeBlockMap,
      profileBlockMap,
    },
    unstable_revalidate: 10,
  }
}

export default ({ homeBlockMap, profileBlockMap }: { homeBlockMap: BlockMapType, profileBlockMap: BlockMapType }) => {
  return(
  <>
    <Header titlePre="Home" />
    {homeBlockMap && (<NotionRenderer blockMap={homeBlockMap} fullPage />)}
    {profileBlockMap && (
      <div className="notion-page notion-page-offset">
      <NotionRenderer blockMap={profileBlockMap} />
      </div>
    )}
  </>
  )
}

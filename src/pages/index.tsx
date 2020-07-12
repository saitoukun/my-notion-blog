import { GetStaticProps } from 'next'
import Header from 'components/header'
import { getPageData, getPageId } from 'lib/notion/getPageData'
import { NotionRenderer, BlockMapType } from "react-notion";

/**
 * Static Generation with Notion
 */
export const getStaticProps: GetStaticProps = async () => {
  const NEXT_PUBLIC_BLOG_HOME_NOTION_URL = process.env.NEXT_PUBLIC_BLOG_HOME_NOTION_URL
  const NEXT_PUBLIC_BLOG_PROFILE_NOTION_URL = process.env.NEXT_PUBLIC_BLOG_PROFILE_NOTION_URL
  if (!NEXT_PUBLIC_BLOG_HOME_NOTION_URL || !NEXT_PUBLIC_BLOG_PROFILE_NOTION_URL) return { props: {} }

  const homePageId = getPageId(NEXT_PUBLIC_BLOG_HOME_NOTION_URL)
  const homeBlockMap = await getPageData(homePageId)

  const profilePageId = getPageId(NEXT_PUBLIC_BLOG_PROFILE_NOTION_URL)
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

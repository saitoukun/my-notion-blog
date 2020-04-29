import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className={sharedStyles.layout}>
      <img
        src="/zeit-and-notion.png"
        height="85"
        width="250"
        alt="ZEIT + Notion"
      />
      <h1>yoppeブログ</h1>
      <h2>
        <ExtLink
          href="https://github.com/ijjk/notion-blog"
          className="dotted"
          style={{ color: 'inherit' }}
        >
          notion-blog
        </ExtLink>
      </h2>
      <div className="explanation">
        <p>
          このブログはvercel(zeit)のnotion-blogを利用しています。自分用にNotionで書いたメモを公開できる場として使います。
        </p>
      </div>
    </div>
  </>
)

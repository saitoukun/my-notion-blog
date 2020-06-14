import Link from 'next/link'
import Header from 'components/header'
import ExtLink from 'components/ext-link'
import { GitHub } from 'components/svgs/github'
import sharedStyles from 'styles/shared.module.css'

//TODO ここもnotionかmdで管理したい
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
      <div className="explanation">
        <p>
          vercelのnotion-blogを参考に、Next.jsで作ったブログです。
          このブログは自分用にNotionで書いたメモを公開できる場として使います。
        </p>
        <ExtLink
          href="https://github.com/saitoukun/my-notion-blog"
          style={{ color: 'inherit' }}
        >
          my-notion-blog
        </ExtLink>
      </div>
    </div>
  </>
)

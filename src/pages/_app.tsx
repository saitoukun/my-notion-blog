import '../styles/global.css'
import Twitter from '../components/svgs/twitter'
import Instagram from '../components/svgs/github'
import Profile from '../styles/profile.module.css'
import ExtLink from '../components/ext-link'
import { textBlock } from '../lib/notion/renderers'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/saitokun13',
  },
  {
    Comp: Instagram,
    alt: 'instagram icon',
    link: 'https://www.instagram.com/yoppe13',
  },
]

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />

    <footer className={Profile.container}>
      <h2>Profile</h2>
      <p>yoppe</p>
      <p>2年目のwebエンジニア。趣味でiOSアプリを作っている。</p>
      <div className={Profile.links}>
        {contacts.map(({ Comp, link, alt }) => {
          return (
            <ExtLink key={link} href={link} aria-label={alt}>
              <Comp height={32} />
            </ExtLink>
          )
        })}
      </div>
    </footer>
  </>
)

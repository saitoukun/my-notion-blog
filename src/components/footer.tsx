import ExtLink from './ext-link'
import { Twitter } from 'components/svgs/twitter'
import { Instagram } from 'components/svgs/Instagram'

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

export default () => (
  <>
    <footer>
      <h2>Profile</h2>
      <a>
        <img src="/profile.jpg" id="profile" alt="yoppe" />
      </a>
      <p>yoppe</p>
      <p>2年目のwebエンジニア。趣味でiOSアプリを作っている。</p>
      <div>
        {contacts.map(({ Comp, link, alt }) => {
          return (
            <ExtLink key={link} href={link} aria-label={alt}>
              <Comp height={32} />
            </ExtLink>
          )
        })}
      </div>
    </footer>

    <style jsx>{`
      footer {
        background-color: ghostwhite;
        max-width: 600px;
        margin: 10px auto;
      }
      #profile {
        width: 4rem;
        height: 4rem;
        border-radius: 9999px;
      }
    `}</style>
  </>
)

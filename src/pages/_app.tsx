import '../styles/global.css'
import Twitter from '../components/svgs/twitter'
import ExtLink from '../components/ext-link'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/saitokun13',
  },
]

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />

    <footer>
      <div className={contactStyles.links}>
        {contacts.map(({ Comp, link, alt }) => {
          return (
            <ExtLink key={link} href={link} aria-label={alt}>
              <Comp height={32} />
            </ExtLink>
          )
        })}
      </div>
      <div>yoppe</div>
    </footer>
  </>
)

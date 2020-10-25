import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'Tags', page: '/tags' },
]

const Header = ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  const domain = 'yoppe.now.sh'
  const description = 'yoppeのnotion-blog。'
  const twitterHandle = 'yoppe'
  const siteName = 'yoppe blog'
  const currentURL = domain + pathname
  const previewImage = 'https://' + domain + '/og-image.png'

  return (
    <header>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} yoppe blog</title>
        <meta name="description" content={description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={titlePre} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />

        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_SITE_VERIFICATION}
        />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page && (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <style jsx>{`
        header {
          display: block;
          min-height: 64px;
          padding: 2em 0;
          text-align: center;
          letter-spacing: -0.02em;
        }

        header ul {
          list-style: none;
          padding: 0;
        }

        header ul li {
          display: inline-block;
          padding: 0 10px;
        }

        header :global(a) {
          color: #888;
          font-weight: 400;
        }

        header :global(a.active) {
          color: #0070f3;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          header {
            padding: 0.5em 0 2em;
          }
        }
      `}</style>
    </header>
  )
}
export default Header

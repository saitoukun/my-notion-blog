import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'Tags', page: '/tags' },
  //{ label: 'Post', page: '/post' },
]

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  const description = "yoppeのnotion-blogdです。"
  const twitterHandle = "yoppe"
  const siteName = "yoppe blog"
  const currentURL = "yoppe.now.sh" + pathname
  const previewImage = 'public/og-image'
  
  return (
    <header>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} yoppe blog</title>
        <meta
          name="description"
          content={description}
        />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={titlePre} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            ) : (
                <ExtLink href={link}>{label}</ExtLink>
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
        color: var(--accents-3);
        font-weight: 400;
      }

      header :global(a.active) {
        color: #0070f3;
        font-weight: 600;
      }

      @media (max-width: 600px) {
        header {
          padding: .5em 0 2em;
        }
      }
      `}</style>
    </header>
  )
}

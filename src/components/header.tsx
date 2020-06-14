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

  return (
    <header>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} My Notion Blog</title>
        <meta
          name="description"
          content="Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="My Notion Blog" />
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

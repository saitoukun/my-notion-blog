import { AppProps } from 'next/app'
import '../styles/global.css'
import Profile from '../styles/profile.module.css'
import ExtLink from '../components/ext-link'
import { textBlock } from '../lib/notion/renderers'
import Footer from '../components/footer'

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

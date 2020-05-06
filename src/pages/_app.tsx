import '../styles/global.css'
import Profile from '../styles/profile.module.css'
import ExtLink from '../components/ext-link'
import { textBlock } from '../lib/notion/renderers'
import Footer from '../components/footer'

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <Footer />
  </>
)

import { AppProps } from 'next/app'
import 'styles/global.css'
import Profile from 'styles/profile.module.css'
import ExtLink from 'components/ext-link'
import { textBlock } from 'lib/notion/renderers'
import Footer from 'components/footer'

/**
 * This function is fired when the final values for any of the metrics have finished calculating on the page. 
 * @param metric 
 */
export function reportWebVitals(metric: any) {
  // These metrics can be sent to any analytics service
  //console.log(metric)
}

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

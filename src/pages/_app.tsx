import { AppProps, AppContext } from 'next/app'
import 'styles/global.css'
import { Footer } from 'components/footer'
import initFirebase from 'lib/initFirebase'
import "react-notion/src/styles.css";

initFirebase();

/**
 * This function is fired when the final values for any of the metrics have finished calculating on the page. 
 * @param metric 
 */
export function reportWebVitals(metric: any) {
  // These metrics can be sent to any analytics service
  //console.log(metric)
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}

export default MyApp
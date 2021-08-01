import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <script async src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + process.env.NEXT_PUBLIC_ADSENCE_CLIENT_ID} crossOrigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

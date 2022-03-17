import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  
  return <>
  <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f6991cb3c19e49f617d52a93a801bd32&autoload=false&libraries=services,clusterer,drawing" strategy='beforeInteractive'/>
  <Component {...pageProps} />
  </>
}

export default MyApp

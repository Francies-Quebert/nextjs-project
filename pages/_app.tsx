import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { Head } from 'next/document'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Component {...pageProps} />
  </>)
}

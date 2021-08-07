import '../styles/globals.css'
import type { AppProps } from 'next/app'
import createLocalization from 'utils/createLocalization';

createLocalization();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp

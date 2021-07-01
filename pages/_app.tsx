import { AppProps } from 'next/app'
import { useUserChanged } from '../hooks/useUserChanged'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const {} = useUserChanged()

  return <Component {...pageProps} />
}

export default MyApp

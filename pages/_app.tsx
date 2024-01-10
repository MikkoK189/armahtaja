import { AppProps } from 'next/app'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '../contexts/UserContext'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  )
}
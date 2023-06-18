import '@/styles/globals.css'
import Link from 'next/link'

export default function App({ Component, pageProps }) {
  return (
      <>
        <header className="navbar bg-base-100">
          <Link className="btn btn-ghost normal-case text-xl" href="/">InterviewGPT</Link>
        </header>

        <Component {...pageProps} />
      </>
  )
}

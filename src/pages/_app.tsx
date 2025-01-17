import React from 'react'

// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'

// External Libs
import '../../public/libs/bootstrap/bootstrap.min.css'

// Custom styles
import '../../public/custom/css/template.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

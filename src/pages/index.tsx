import React from 'react'

// External Libs
import Head from 'next/head'

// Page Content
import DisturbedContent from '../components/content/disturbed'

function Home() {
  return (
    <>
      <Head>
        <title>Disturbed</title>
      </Head>
      <main>
        <DisturbedContent />
      </main>
    </>
  )
}

export default Home

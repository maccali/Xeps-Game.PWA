import React from 'react'

// External Libs
import Head from 'next/head'

import Meta from '../components/utils/meta'

// Page Content
import DisturbedContent from '../components/content/disturbed'

function Home() {
  return (
    <>
      <Meta />
      <main>
        <DisturbedContent />
      </main>
    </>
  )
}

export default Home

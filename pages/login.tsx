import React from 'react'

import Layout from '../components/Layout'
import Head from 'next/head'
import netlifyAuth from '../libs/netlifyAuth'

export const Home = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = React.useState(netlifyAuth.isAuthenticated)
  React.useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  const login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user)
    })
  }
  const logout = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user)
    })
  }
  return (
    <>
      <Head>
        <title>login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {loggedIn ? (
          <button
            className="bg-grey-light shadow-lg hover:bg-grey text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center uppercase bg-gray-200 rounded-lg"
            onClick={login}
          >
            Sign out
          </button>
        ) : (
          <button
            className="bg-grey-light shadow-lg hover:bg-grey text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center uppercase bg-gray-200 rounded-lg"
            onClick={logout}
          >
            Sign in
          </button>
        )}
      </Layout>
    </>
  )
}

export default Home

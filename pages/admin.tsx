import React from 'react'
import Head from 'next/head'
import { useAuth } from '../contexts/auth'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import fetcher from '../libs/fetch'
import MovieForm from '../components/MovieForm'
import Movie from '../components/Movie'
import Layout from '../components/Layout'
import useSWR from 'swr'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const MovieInfos = ({ movieName, onAddMovieToFavorites }) => {
  const { data, error } = useSWR(
    ['/.netlify/functions/search-movie', movieName],
    (url, movieName) =>
      fetcher(url, {
        method: 'POST',
        body: JSON.stringify({
          term: movieName,
        }),
      })
  )
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (data.length <= 0) {
    return <div>nothing found</div>
  }
  const withoutIncompleteMovieData = data.filter((dataItem) => {
    return Object.keys(dataItem).length > 0
  })
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {withoutIncompleteMovieData.map((movie) => {
        return (
          <Movie
            key={movie.id}
            id={movie.id}
            poster={movie.posterPath}
            title={movie.title}
            voteCount={movie.voteCount}
            overview={movie.overview}
            rating={movie.voteAverage}
            keywords={movie.genres.slice(1, 6)}
            onAddMovieToFavorites={onAddMovieToFavorites}
          ></Movie>
        )
      })}
    </div>
  )
}

const Admin = (): JSX.Element => {
  const [movieName, setMovieName] = React.useState('')
  const { isLoggedIn, user, login } = useAuth()

  const handleSubmit = (newMovieName) => {
    setMovieName(newMovieName)
  }

  const handleReset = () => {
    setMovieName('')
  }

  const handleAddMovie = async ({
    id,
    title,
  }: {
    id: number
    title: string
  }) => {
    try {
      await fetcher('/.netlify/functions/add-movie', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`,
        },
        body: JSON.stringify({
          id: id,
          title: title,
        }),
      })
      toast('Added as favorite!', { type: 'success' })
    } catch (error) {
      toast(`Error somehting went wrong!`, { type: 'error' })
    }
  }
  return (
    <>
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ToastContainer></ToastContainer>
      <Layout>
        {isLoggedIn ? (
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:fpx-8">
            <div className="lg:text-center mt-8">
              <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
                Movies
              </p>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                Search and add movies to favorite
              </h3>
              <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
                you can search for a movie by name and add it as a favorite
              </p>
            </div>
            <div className="md:flex md:justify-center mb-6">
              <MovieForm movieName={movieName} onSubmit={handleSubmit} />
            </div>
            <hr className="mb-8" />
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={handleReset}
              resetKeys={[movieName]}
            >
              <Layout>
                {movieName.length > 0 ? (
                  <MovieInfos
                    movieName={movieName}
                    onAddMovieToFavorites={handleAddMovie}
                  />
                ) : (
                  <div>Type to search for a movie</div>
                )}
              </Layout>
            </ErrorBoundary>
          </div>
        ) : (
          <div className="max-w-md w-full">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm leading-5 text-gray-600">
              You have to sign in to view the Admin Page
            </p>
            <button
              className="transition duration-200 ease-in-out hover:bg-indigo-500 hover:text-white bg-grey-light shadow-lg hover:bg-grey text-gray-700 font-bold py-2 px-4 flex justify-items-center items-center uppercase bg-gray-200 rounded-lg mt-8 ml-auto mr-auto"
              onClick={login}
            >
              Sign in
            </button>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Admin

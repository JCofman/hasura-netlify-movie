import React from 'react'
import fetcher from '../libs/fetch'
import MovieForm from '../components/MovieForm'
import Movie from '../components/Movie'
import Layout from '../components/Layout'
import useSWR from 'swr'
import { ErrorBoundary } from 'react-error-boundary'
import netlifyAuth from '../libs/netlifyAuth'
import { useRouter } from 'next/router'

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

  const withoutIncompleteMovieData = data.filter((dataItem) => {
    return Object.keys(dataItem.node).length > 0
  })

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {withoutIncompleteMovieData.map((movieNode) => {
        const { node: movie } = movieNode
        return (
          <Movie
            key={movie.id}
            id={movie.id}
            poster={movie.poster}
            title={movie.title}
            overview={movie.overview}
            rating={movie.rating}
            keywords={movie.keywords.slice(1, 6)}
            onAddMovieToFavorites={onAddMovieToFavorites}
          ></Movie>
        )
      })}
    </div>
  )
}

const Admin = (): JSX.Element => {
  const [loggedIn] = React.useState(false)

  const [movieName, setMovieName] = React.useState('')

  const router = useRouter()

  React.useEffect(() => {
    if (netlifyAuth.isAuthenticated === false) {
      router.push('/login')
    }
  })

  if (!loggedIn) return null

  const handleSubmit = (newMovieName) => {
    setMovieName(newMovieName)
  }

  const handleReset = () => {
    setMovieName('')
  }
  // todo
  const handleAddMovie = async (id: number) => {
    try {
      await fetcher('/.netlify/functions/add-movie', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
        }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="pokemon-info">
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
    </div>
  )
}

export default Admin

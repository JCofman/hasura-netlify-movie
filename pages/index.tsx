import Head from 'next/head'
import Layout from '../components/Layout'
import Movie from '../components/Movie'
import fetcher from '../libs/fetch'
import useSWR from 'swr'
import produce from 'immer'

const requestUpdateMovieLikes = async (id: number) => {
  fetcher('/.netlify/functions/update-movie', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
    }),
  })
}

const MovieInfos = () => {
  const { data, error, mutate } = useSWR('/.netlify/functions/movies', (url) =>
    fetcher(url)
  )

  const handleLike = async (id: number) => {
    const movieIndexToUpdate = data.inovexMovies.findIndex(
      (movie) => movie.id === id
    )
    const updatedData = produce(data, (draftState) => {
      draftState.inovexMovies[movieIndexToUpdate].likes += 1
    })
    mutate({ ...updatedData }, false)

    await requestUpdateMovieLikes(id)
  }
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const inovexFavoriteMovies = data.inovexMovies
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {inovexFavoriteMovies.map((movie) => {
        return (
          <Movie
            key={movie.id}
            id={movie.id}
            likes={movie.likes}
            poster={movie['tmdb'].poster}
            title={movie['tmdb'].title}
            overview={movie['tmdb'].overview}
            rating={movie['tmdb'].rating}
            keywords={movie['tmdb'].keywords.slice(1, 6)}
            onLikeMovie={handleLike}
          ></Movie>
        )
      })}
    </div>
  )
}

export const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>inovex Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <MovieInfos />
      </Layout>
    </>
  )
}

export default Home

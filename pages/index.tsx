import React from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import produce from 'immer'

import Layout from '../components/Layout'
import Movie from '../components/Movie'
import fetcher from '../libs/fetch'
import { useAuth } from '../contexts/auth'

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
  const { isLoggedIn } = useAuth()

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
            poster={movie['tmdb'].posterPath}
            title={movie['tmdb'].title}
            voteCount={movie['tmdb'].voteCount}
            overview={movie['tmdb'].overview}
            rating={movie['tmdb'].voteAverage}
            keywords={movie['tmdb'].genres.slice(1, 6)}
            onLikeMovie={isLoggedIn ? handleLike : null}
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

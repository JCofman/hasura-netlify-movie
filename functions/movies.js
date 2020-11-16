const { query } = require('./utils/hasura')

exports.handler = async () => {
  const data = await query({
    query: `
        query {
          inovexMovies: inovex_movies {
            likes
            id
            tmdb {
              title
              overview
              posterPath
              genres {
                id
                name
              }
              voteAverage
              voteCount
            }
          }
        }
        `,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

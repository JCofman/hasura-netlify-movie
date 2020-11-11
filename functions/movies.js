const { query } = require('./utils/hasura')

exports.handler = async () => {
  const data = await query({
    query: `
        query {
          inovexMovies: inovex_movies {
            likes
            id
            tmdb {
              keywords {
                name
                id
              }
              title
              overview
              rating 
              poster(size: Original)
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

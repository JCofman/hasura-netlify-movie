const { query } = require('./utils/hasura')

exports.handler = async (event) => {
  const { term } = JSON.parse(event.body)
  const data = await query({
    query: `
    query SearchQuery($term: String!) {
      search(query: $term) {
        results {
          ... on Movie {
            id
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
    }
        `,
    variables: {
      term: term,
    },
  })
  if (data && data.search && data.search.results) {
    return {
      statusCode: 200,
      body: JSON.stringify(data.search.results),
    }
  } else {
    return {
      statusCode: 404,
      body: 'Nothing found',
    }
  }
}

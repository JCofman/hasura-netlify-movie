const { query } = require('./utils/hasura')

exports.handler = async (event) => {
  const { term } = JSON.parse(event.body)
  const data = await query({
    query: `
    query SearchQuery($term: String!){
        search(term: $term) {
          edges {
            node {
              ... on MovieResult {
                id
                title
                rating
                poster(size: Original)
                overview
                isAdult
                keywords {
                  id
                  name
                }
              }
            }
          }
        }
      }
        `,
    variables: {
      term: term,
    },
  })
  if (data && data.search && data.search.edges) {
    return {
      statusCode: 200,
      body: JSON.stringify(data.search.edges),
    }
  } else {
    return {
      statusCode: 404,
      body: 'Nothing found',
    }
  }
}

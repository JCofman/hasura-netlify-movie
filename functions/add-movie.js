const { query } = require('./utils/hasura')

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body)
  // eslint-disable-next-line no-undef
  const { user } = context.clientContext
  const isLoggedIn = user && user.app_metadata
  const roles = user.app_metadata.roles || []

  if (!isLoggedIn || !roles.includes('admin')) {
    return {
      statusCode: 401,
      body: 'Unauthorized',
    }
  }

  const result = await query({
    query: `
    mutation ($id: String!, $poster: String!, $tagline: String!, $title: String!) {
      insert_movies_one(object: {id: $id, poster: $poster, tagline: $tagline, title: $title}) {
        id
       
      }
    }
        `,
    variables: {
      id,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

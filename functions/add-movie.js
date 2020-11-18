const { query } = require('./utils/hasura')

exports.handler = async (event, context) => {
  const { id, title } = JSON.parse(event.body)
  const { user } = context.clientContext
  const isLoggedIn = user && user.app_metadata
  const roles = user.app_metadata.roles || []

  if (!isLoggedIn || !roles.includes('editor')) {
    return {
      statusCode: 401,
      body: 'You are not authorized to add new movies',
    }
  }

  const result = await query({
    query: `
    mutation ($id: String!, $title: String!, $userId: String!) {
      insert_inovex_movies_one(object: {id: $id, tmdb_id: $id, title: $title, userId: $userId}) {
        id
        title
        userId
      }
    }
        `,
    variables: {
      id,
      title,
      userId: user.sub,
    },
  })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

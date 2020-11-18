const { query } = require('./utils/hasura')

exports.handler = async (event, context) => {
  const { id } = JSON.parse(event.body)
  const { user } = context.clientContext
  const isLoggedIn = user && user.app_metadata
  const roles = user.app_metadata.roles || []
  const isAllowedToUpdate = roles.includes('user') || roles.includes('editor')

  if (!isLoggedIn || !isAllowedToUpdate) {
    return {
      statusCode: 401,
      body: 'You are not authorized to update movie likes',
    }
  }

  const result = await query({
    query: `
    mutation ($id: String!) {
        update_inovex_movies_by_pk(pk_columns: {id: $id}, _inc: {likes: 1}) {
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

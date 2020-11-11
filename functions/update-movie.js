const { query } = require('./utils/hasura')

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body)

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

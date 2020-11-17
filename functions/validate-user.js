exports.handler = async (event, context) => {
  const { user } = context.clientContext
  if (user) {
    const userId = user.sub
    const roles = user.app_metadata.roles || []

    return {
      statusCode: 200,
      body: JSON.stringify({
        'X-Hasura-User-Id': userId,
        'X-Hasura-Role': roles.join(', '),
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      'X-Hasura-User-Id': 'anonymous',
    }),
  }
}

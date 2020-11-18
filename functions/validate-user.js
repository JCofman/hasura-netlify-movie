exports.handler = async (event, context) => {
  const { user } = context.clientContext
  // eslint-disable-next-line no-console
  if (user) {
    const userId = user.sub
    const roles = user.app_metadata.roles || []

    // eslint-disable-next-line no-console

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
      'X-Hasura-Role': 'anonymous',
    }),
  }
}

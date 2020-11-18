const fetch = require('node-fetch')

async function query({ query, variables = {}, asAdmin = false }) {
  const adminHeader = {
    'Content-Type': 'application/json',
    'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
  }
  const result = await fetch(process.env.HASURA_API_URL, {
    method: 'POST',
    headers: asAdmin
      ? adminHeader
      : {
          'Content-Type': 'application/json',
          'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
        },
    body: JSON.stringify({ query, variables }),
  }).then((response) => response.json())
  return result.data
}

exports.query = query

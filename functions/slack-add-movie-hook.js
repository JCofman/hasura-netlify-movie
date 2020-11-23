const fetch = require('node-fetch')

exports.handler = async (event) => {
  // Only allow POST
  const hasuraEventPayload = JSON.parse(event.body)
  // eslint-disable-next-line no-console
  console.log(hasuraEventPayload.event.data.new)
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const name = hasuraEventPayload.event.data.new || 'World'

  // Send greeting to Slack
  return fetch(process.env.SLACK_WEBHOOK_URL, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ text: `Hello 👋, a new Movie got added ${name}!` }),
  })
    .then(() => ({
      statusCode: 200,
      body: `Add movie Slack message successfully send`,
    }))
    .catch((error) => ({
      statusCode: 422,
      body: `Oops! Something went wrong. ${error}`,
    }))
}

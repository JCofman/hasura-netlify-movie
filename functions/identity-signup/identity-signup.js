// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions

const { query } = require('../utils/hasura')

const handler = async function (event) {
  const { user } = JSON.parse(event.body)
  const userRoles =
    user.email.split('@')[1] === 'inovex.de' ? ['editor'] : ['user']
  const responseBody = {
    app_metadata: {
      roles: userRoles,
      my_user_info: `this user has the following roles ${userRoles.join(', ')}`,
    },
    user_metadata: {
      // append current user metadata
      ...user.user_metadata,
      custom_data_from_function: 'hurray this is some extra metadata',
    },
  }
  // create also hasura user
  await query({
    query: `

  mutation MyMutation($id: String, $email: String, $name: String) {
    insert_users(objects: {id: $id, email: $email, name: $name }) {affected_rows}
  }

          `,
    variables: {
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

module.exports = { handler }

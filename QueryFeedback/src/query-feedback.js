const { query } = require('./graphql')

const handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 2))

  const { data: feedback } = await query(event.body)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedback)
  }
}

module.exports = {
  handler
}

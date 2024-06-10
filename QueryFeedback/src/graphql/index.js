const { graphql } = require('graphql')

const schema = require('./schema')
const { getFeedback } = require('../repos/feedback')

const rootValue = {
  feedback: async () => {
    const feedback = await getFeedback()

    return feedback
  }
}

const query = async (body) => {
  try {
    const res = await graphql({
      schema,
      source: body,
      rootValue
    })

    return res
  } catch (err) {
    console.error(`Error querying feedback: ${err}`)
    throw err
  }
}

module.exports = {
  query
}

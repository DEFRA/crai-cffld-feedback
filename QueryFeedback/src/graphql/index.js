const { graphql } = require('graphql')

const { bedrock } = require('../clients')
const schema = require('./schema')
const { getFeedback } = require('../repos/feedback')

const rootValue = {
  feedback: async (args) => {
    if (args.search) {
      args.embeddings = await bedrock.embeddings.embedQuery(args.search)
    }

    const feedback = await getFeedback(args)

    return feedback.map((f) => ({
      ...f,
      date_time: new Date(f.date_time).toISOString()
    }))
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

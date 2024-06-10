const { buildSchema } = require('graphql')
const feedback = require('./feedback')
const query = require('./query')

const schema = buildSchema(`
  ${feedback}

  ${query}
`)

module.exports = schema

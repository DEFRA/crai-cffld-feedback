const { getConfig } = require('../config/db')
const pgvector = require('pgvector/knex')

const knex = require('knex')({
  client: 'pg',
  connection: getConfig
})

const getFeedback = async () => {
  try {
    const feedback = await knex('feedback').select('*')

    return feedback
  } catch (err) {
    console.error(`Error getting feedback from db: ${err}`)
    throw err
  }
}

module.exports = {
  getFeedback
}

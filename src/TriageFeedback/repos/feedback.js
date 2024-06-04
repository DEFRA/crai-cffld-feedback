const { getConfig } = require('../../config/db')

const knex = require('knex')({
  client: 'pg',
  connection: getConfig
})

const addFeedback = async (feedback) => {
  try {
    await knex('feedback').insert(feedback)
  } catch (err) {
    console.error(`Error adding feedback to db: ${err}`)
    throw err
  }
}

module.exports = {
  addFeedback
}
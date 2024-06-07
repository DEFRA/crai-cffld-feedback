const { getConfig } = require('../../config/db')
const pgvector = require('pgvector/knex')

const knex = require('knex')({
  client: 'pg',
  connection: getConfig
})

const addFeedback = async (feedback) => {
  try {
    const exisiting = await knex('feedback')
      .select('qualtrics_id')
      .where('qualtrics_id', feedback.qualtrics_id)

    if (exisiting.length > 0) {
      return console.log(`Feedback with qualtrics_id: ${feedback.qualtrics_id} already exists.`)
    }

    const enriched = {
      ...feedback,
      key_points: JSON.stringify(feedback.key_points),
      embedding: pgvector.toSql(feedback.embedding)
    }

    await knex('feedback').insert(enriched)
  } catch (err) {
    console.error(`Error adding feedback to db: ${err}`)
    throw err
  }
}

module.exports = {
  addFeedback
}

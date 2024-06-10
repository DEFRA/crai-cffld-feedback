const { processFeedback } = require('./services/feedback-reader')
const { sendFeedbackRows } = require('./services/feedback-sender')
const { getObjectBuffer } = require('./lib/s3')

const handler = async (event, context) => {
  const { bucket, object } = event.Records[0].s3

  console.log(`A new file ${object.key} was created in bucket ${bucket.name}`)

  const data = await getObjectBuffer(bucket.name, object.key)
  const rows = await processFeedback(object.key, data)
  await sendFeedbackRows(rows)

  return console.info(`Ingestion of ${bucket.name}/${object.key} complete`)
}

module.exports = {
  handler
}

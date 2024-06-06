const { sendMessageBatch } = require('../../lib/sqs')

const sendFeedbackRows = async (rows) => {
  const batchSize = 10

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)

    await sendMessageBatch(process.env.TRIAGE_QUEUE_URL, batch)
  }
}

module.exports = {
  sendFeedbackRows
}

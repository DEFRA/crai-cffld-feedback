
const { deleteMessage, sendMessage } = require('../lib/sqs')
const { processFeedback } = require('./services/process-feedback')

const handler = async (event, context) => {
  console.info(`Received event: ${JSON.stringify(event)}`)

  for ({ body, receiptHandle } of event.Records) {
    const data = JSON.parse(body)

    console.info(`Triaging feedback: ${JSON.stringify(data)}`)

    try {
      const triaged = await processFeedback(data)
      console.info(triaged)
      await deleteMessage(process.env.TRIAGE_QUEUE_URL, receiptHandle)
    } catch (err) {
      console.error(`Error processing feedback: ${err}`)

      await sendMessage(`${process.env.TRIAGE_QUEUE_URL}-dlq`, data)
    }
  }

  return console.info('Feedback batch processed successfully')
}

module.exports = {
  handler
}


const { deleteMessage } = require('../lib/sqs')
const { processFeedback } = require('./services/process-feedback')

const handler = async (event, context) => {
  console.info(`Received event: ${JSON.stringify(event)}`)

  for ({ body, receiptHandle } of event.Records) {
    const data = JSON.parse(body)

    console.info(`Triaging feedback: ${JSON.stringify(data)}`)

    const triaged = await processFeedback(data)
    console.info(triaged)
    
    await deleteMessage(process.env.TRIAGE_QUEUE_URL, receiptHandle)
  }

  return console.info('Feedback batch processed successfully')
}

module.exports = {
  handler
}

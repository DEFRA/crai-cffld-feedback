const { SQSClient } = require('@aws-sdk/client-sqs')

const sqs = new SQSClient({
  region: 'eu-central-1'
})

module.exports = sqs

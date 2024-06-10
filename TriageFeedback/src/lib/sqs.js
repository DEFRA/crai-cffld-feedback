const { v4: uuidv4 } = require('uuid')
const { SendMessageCommand, SendMessageBatchCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs')
const { sqs } = require('../clients')

const sendMessage = async (queueUrl, data) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(data)
  }

  try {
    await sqs.send(new SendMessageCommand(params))
  } catch (err) {
    console.error('Error sending message to SQS: ', err)
    throw err
  }
}

const sendMessageBatch = async (queueUrl, entries) => {
  const enriched = entries.map((entry) => ({
    Id: uuidv4(),
    MessageBody: JSON.stringify(entry)
  }))

  const params = {
    QueueUrl: queueUrl,
    Entries: enriched
  }

  try {
    await sqs.send(new SendMessageBatchCommand(params))
  } catch (err) {
    console.error('Error sending message batch to SQS: ', err)
    throw err
  }
}

const deleteMessage = async (queueUrl, receiptHandle) => {
  const params = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle
  }

  try {
    await sqs.send(new DeleteMessageCommand(params))
  } catch (err) {
    console.error('Error deleting message from SQS: ', err)
    throw err
  }
}

module.exports = {
  sendMessage,
  sendMessageBatch,
  deleteMessage
}

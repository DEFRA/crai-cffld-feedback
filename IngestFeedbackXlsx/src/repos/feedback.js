const { addEntity } = require('../lib/dynamodb')

const enrichFeedbackRow = (feedback) => ({
  Service: { S: 'cffld' },
  FeedbackId: { S: feedback.feedbackId },
  TotalRedacted: { N: `${feedback.totalRedacted}` }
})

const addFeedbackRow = async (feedback) => {
  try {
    const enriched = enrichFeedbackRow(feedback)

    await addEntity('cffld-feedback-metadata', enriched)
  } catch (err) {
    console.error('Error adding feedback metadata to DynamoDB: ', err)
    throw err
  }
}

module.exports = {
  addFeedbackRow
}

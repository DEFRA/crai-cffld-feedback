const { addEntity } = require('../lib/dynamodb')

const enrichFeedbackRow = (feedback) => {
  const totalRedacted = feedback.totalRedacted || 0
  const totalFeedback = feedback.totalFeedback || 0

  return {
    Service: { S: 'cffld' },
    FeedbackId: { S: feedback.feedbackId },
    TotalRedacted: { N: `${totalRedacted}` },
    TotalFeedback: { N: `${totalFeedback}` },
    Status: { S: feedback.status }
  }
}

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

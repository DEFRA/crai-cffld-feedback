const readXlsxFile = require('read-excel-file/node')
const schema = require('./schema')
const { redactPiiRows } = require('../../../lib/comprehend')
const { addFeedbackRow } = require('../../repos/feedback')

const processFeedback = async (id, buffer) => {
  try {
    const { rows, errors } = await readXlsxFile(buffer, { schema })
    
    if (errors.length) {
      console.error('Schema validation errors: ', errors)
      throw new Error('Schema validation failed')
    }

    const { redactedRows, totalRedacted } = await redactPiiRows(rows)

    const feedbackMetadata = {
      feedbackId: id,
      totalRedacted
    }

    await addFeedbackRow(feedbackMetadata)

    return redactedRows

    return
  } catch (err) {
    console.error('Error processing feedback: ', err)
    throw err
  }
}

module.exports = {
  processFeedback
}
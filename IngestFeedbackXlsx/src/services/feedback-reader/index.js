const readXlsxFile = require('read-excel-file/node')
const schema = require('./schema')
const { redactPiiRows } = require('../../lib/comprehend')
const { addFeedbackRow } = require('../../repos/feedback')

const processFeedback = async (id, buffer) => {
  try {
    await addFeedbackRow({ feedbackId: id, status: 'PROCESSING' })

    const { rows, errors } = await readXlsxFile(buffer, { schema })

    if (errors.length) {
      console.error('Schema validation errors: ', errors)

      throw new Error('Schema validation failed')
    }

    const { redactedRows, totalRedacted } = await redactPiiRows(rows)

    const metadata = {
      feedbackId: id,
      totalRedacted,
      totalFeedback: rows.length,
      status: 'UPLOADED'
    }

    await addFeedbackRow(metadata)

    return redactedRows
  } catch (err) {
    console.error('Error processing feedback: ', err)
    
    await addFeedbackRow({ feedbackId: id, status: 'FAILED' })
    
    throw err
  }
}

module.exports = {
  processFeedback
}

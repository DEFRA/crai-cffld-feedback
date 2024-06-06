const readXlsxFile = require('read-excel-file/node')
const schema = require('./schema')
const { redactPii } = require('../../../lib/comprehend')

const processFeedback = async (buffer) => {
  try {
    const { rows, errors } = await readXlsxFile(buffer, { schema })
    
    if (errors.length) {
      console.error('Schema validation errors: ', errors)
      throw new Error('Schema validation failed')
    }

    for (const row of rows) {
      row.comments = await redactPii(row.comments)
    }

    return rows
  } catch (err) {
    console.error('Error processing feedback: ', err)
    throw err
  }
}

module.exports = {
  processFeedback
}
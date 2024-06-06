const { DetectPiiEntitiesCommand } = require('@aws-sdk/client-comprehend')
const comprehend = require('../clients/comprehend')

const excludedPiiCategories = [
  'ADDRESS'
]

const redactPiiRows = async (rows) => {
  const redactedRows = []
  let totalRedacted = 0

  for (const row of rows) {
    const { redacted, count } = await redactPii(row.comments)

    redactedRows.push({
      ...row,
      comments: redacted
    })

    totalRedacted += count
  }

  return { redactedRows, totalRedacted }
}

const redactPii = async (text) => {
  try {
    const params = new DetectPiiEntitiesCommand({
      Text: text,
      LanguageCode: 'en'
    })

    const { Entities: entities } = await comprehend.send(params)

    let redacted = text

    let count = 0

    for (const entity of entities) {
      const { BeginOffset: start, EndOffset: end, Type: type } = entity

      if (!excludedPiiCategories.includes(type)) {
        redacted = redacted.substring(0, start) + '*'.repeat(end - start) + redacted.substring(end)

        count += 1
      }
    }

    return { redacted, count }
  } catch (err) {
    console.error('Error detecting PII entities: ', err)

    throw err
  }
}

module.exports = {
  redactPii,
  redactPiiRows
}

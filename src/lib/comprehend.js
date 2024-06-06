const { DetectPiiEntitiesCommand } = require('@aws-sdk/client-comprehend')
const comprehend = require('../clients/comprehend')

const excludedPiiCategories = [
  'ADDRESS'
]

const redactPii = async (text) => {
  try {
    const params = new DetectPiiEntitiesCommand({
      Text: text,
      LanguageCode: 'en'
    })

    const { Entities: entities } = await comprehend.send(params)

    let redacted = text

    for (const entity of entities) {
      const { BeginOffset: start, EndOffset: end, Type: type } = entity

      if (!excludedPiiCategories.includes(type)) {
        redacted = redacted.substring(0, start) + '*'.repeat(end - start) + redacted.substring(end)
      }
    }

    return redacted
  } catch (err) {
    console.error('Error detecting PII entities: ', err)

    throw err
  }
}

module.exports = {
  redactPii
}

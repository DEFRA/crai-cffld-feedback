const { JsonOutputParser } = require('@langchain/core/output_parsers')
const { ChatPromptTemplate } = require('@langchain/core/prompts')
const { bedrock } = require('../../clients')
const { triage } = require('../constants/prompt')

const processFeedback = async (data) => {
  try {
    const chain = ChatPromptTemplate.fromTemplate(triage)
      .pipe(bedrock)
      .pipe(new JsonOutputParser())
    
    const res = await chain
      .invoke({ feedback: JSON.stringify(data) })
    
    return {
      ...data,
      ...res
    }
  } catch (err) {
    console.error(`Error invoking Bedrock: ${err}`)

    throw err
  }
}

module.exports = {
  processFeedback
}

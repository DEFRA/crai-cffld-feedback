const { StringOutputParser } = require('@langchain/core/output_parsers')
const { ChatPromptTemplate } = require('@langchain/core/prompts')
const { bedrock } = require('../clients')

const processFeedback = async (data) => {
  try {
    const chain = ChatPromptTemplate.fromTemplate('Tell me a joke about {topic}')
      .pipe(bedrock)
      .pipe(new StringOutputParser())
    
    const res = await chain
      .invoke({ topic: 'langchain' })

    return res
  } catch (err) {
    console.error(`Error invoking Bedrock: ${err}`)

    throw err
  }
}

module.exports = {
  processFeedback
}

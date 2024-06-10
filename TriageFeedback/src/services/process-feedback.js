const { JsonOutputParser } = require('@langchain/core/output_parsers')
const { ChatPromptTemplate } = require('@langchain/core/prompts')
const { bedrock } = require('../clients')
const { triage } = require('../constants/prompt')
const { addFeedback } = require('../repos/feedback')
const { schema } = require('../schemas/triage')

const processFeedback = async (data) => {
  const triaged = await generateTriageData(data)

  await addFeedback(triaged)

  return triaged
}

const generateTriageData = async (data) => {
  try {
    const chain = ChatPromptTemplate.fromTemplate(triage)
      .pipe(bedrock.llm)
      .pipe(new JsonOutputParser())

    const res = await chain
      .invoke({ feedback: JSON.stringify(data) })

    const { error } = await schema.validateAsync(res)

    if (error) {
      throw new Error(`Incorrect llm json response: ${error.messages}`)
    }

    const embedding = await bedrock.embeddings.embedQuery(data.comments)

    return {
      ...data,
      ...res,
      embedding
    }
  } catch (err) {
    console.error(`Error invoking Bedrock: ${err}`)

    throw err
  }
}

module.exports = {
  processFeedback
}

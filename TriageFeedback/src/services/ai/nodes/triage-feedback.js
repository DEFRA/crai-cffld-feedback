const { JsonOutputParser } = require('@langchain/core/output_parsers')
const { ChatPromptTemplate } = require('@langchain/core/prompts')

const { bedrock } = require('../clients')
const { triagePrompt } = require('../constants/triage-prompt')
const { addFeedback } = require('../repos/feedback')
const { schema } = require('../schemas/triage')

const node = async (state) => {
  const chain = ChatPromptTemplate.fromTemplate(triagePrompt)
    .pipe(bedrock.llm)
    .pipe(new JsonOutputParser())

  const res = await chain
    .invoke({ feedback: JSON.stringify(state.feedback) })

  const { error } = await schema.validateAsync(res)

  if (error) {
    throw new Error(`Incorrect llm json response: ${error.messages}`)
  }

  const embedding = await bedrock.embeddings.embedQuery(state.feedback.comments)

  const triaged = {
    ...state.feedback,
    ...res,
    embedding
  }

  await addFeedback(triaged)

  return {
    feedback: triaged
  }
}

const NAME = 'triage_feedback'

module.exports = {
  NAME,
  node
}

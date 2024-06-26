const { ChatPromptTemplate } = require('@langchain/core/prompts')
const { StringOutputParser } = require('@langchain/core/output_parsers')

const { systemPrompt } = require('../../../constants/screenshot-prompt')
const { llm } = require('../../../clients/bedrock')

const NAME = 'check_comment'

const node = async (state) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    ['human', '{comments}']
  ])

  const chain = prompt
    .pipe(llm)
    .pipe(new StringOutputParser())

  const res = await chain.invoke({
    comments: state.feedback.comments
  })

  return {
    check_comment: res
  }
}

module.exports = {
  NAME,
  node
}

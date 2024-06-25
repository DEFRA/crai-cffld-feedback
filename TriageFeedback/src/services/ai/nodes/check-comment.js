const { ChatPromptTemplate } = require('@langchain/core/prompts')
const { StringOutputParser } = require('@langchain/core/output_parsers')

const NAME = 'check_comment'

const systemPrompt = require('../../../constants/screenshot-prompt')

const node = async (state) => {
//   const { content: input } = state.messages[state.messages.length - 1]

  //   if (state.chat_history.length === 0) {
  //     return {
  //       input
  //     }

  //   const prompt = ChatPromptTemplate.fromMessages([
  //     ['system', systemPrompt],
  //     ['human', '{input}']
  //   ])

  //   const chain = prompt
  //     .pipe(sonnet)
  //     .pipe(new StringOutputParser())

  //   const res = await chain.invoke({
  //     chat_history: JSON.stringify(state.chat_history),
  //     input
  //   })

  return {
    check_comment: res
  }
}

module.exports = {
  NAME,
  node
}

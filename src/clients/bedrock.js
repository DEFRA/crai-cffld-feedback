const { BedrockChat } = require('@langchain/community/chat_models/bedrock')
const { BedrockEmbeddings } = require('@langchain/community/embeddings/bedrock')

const llm = new BedrockChat({
  model: process.env.BEDROCK_MODEL_ID,
  region: 'eu-central-1'
})

const embeddings = new BedrockEmbeddings({
  region: 'eu-central-1',
  model: process.env.BEDROCK_EMBEDDING_MODEL_ID
})

module.exports = {
  llm,
  embeddings
}

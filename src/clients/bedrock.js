const { BedrockChat } = require("@langchain/community/chat_models/bedrock")

const llm = new BedrockChat({
  model: process.env.BEDROCK_MODEL_ID,
  region: "eu-central-1"
})

module.exports = llm

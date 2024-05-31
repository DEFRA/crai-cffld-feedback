const { BedrockChat } = require("@langchain/community/chat_models/bedrock")

const llm = new BedrockChat({
  model: "anthropic.claude-3-haiku-20240307-v1:0",
  region: "eu-central-1"
})

module.exports = llm

const s3 = require('./s3')
const dynamodb = require('./dynamodb')
const sqs = require('./sqs')
const bedrock = require('./bedrock')
const secretsManager = require('./secrets-manager')
const comprehend = require('./comprehend')

module.exports = {
  s3,
  dynamodb,
  sqs,
  bedrock,
  secretsManager,
  comprehend
}

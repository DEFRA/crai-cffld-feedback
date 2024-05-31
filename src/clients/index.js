const s3 = require('./s3')
const dynamodb = require('./dynamodb')
const sqs = require('./sqs')
const bedrock = require('./bedrock')

module.exports = {
  s3,
  dynamodb,
  sqs,
  bedrock
}

const s3 = require('./s3')
const dynamodb = require('./dynamodb')
const sqs = require('./sqs')
const secretsManager = require('./secrets-manager')
const comprehend = require('./comprehend')

module.exports = {
  s3,
  dynamodb,
  sqs,
  secretsManager,
  comprehend
}

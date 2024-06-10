const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')

const dynamodb = new DynamoDBClient({
  region: 'eu-central-1'
})

module.exports = dynamodb

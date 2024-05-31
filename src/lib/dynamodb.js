const { PutItemCommand } = require('@aws-sdk/client-dynamodb')
const { dynamodb } = require('../clients')

const addEntity = async (table, item) => {
  const params = new PutItemCommand({
    TableName: table,
    Item: {
      ...item
    }
  })

  console.log(`Adding feedback (${item.qualtrics_id.S})`)

  try {
    await dynamodb.send(params)
  } catch (err) {
    console.error('Error adding entity to DynamoDB: ', err)
    throw err
  }
}

module.exports = {
  addEntity
}

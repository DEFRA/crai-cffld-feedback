const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const { sdkStreamMixin } = require('@aws-sdk/util-stream-node')
const { s3 } = require('../clients')

const saveObject = async (bucket, key, buffer) => {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: buffer
  }

  try {
    await s3.send(new PutObjectCommand(params))
  } catch (err) {
    console.error('Error saving object to S3: ', err)
    throw err
  }
}

const getObjectBuffer = async (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key
  }

  const getObject = new GetObjectCommand(params)

  try {
    const data = await s3.send(getObject)

    const bytes = await sdkStreamMixin(data.Body).transformToByteArray()

    return Buffer.from(bytes)
  } catch (err) {
    console.error('Error getting object from S3: ', err)
    throw err
  }
}

module.exports = {
  getObjectBuffer,
  saveObject
}

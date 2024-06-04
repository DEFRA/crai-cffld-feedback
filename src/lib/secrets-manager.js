const { GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager")
const { secretsManager } = require("../clients")

const getSecret = async (secretId, json = false) => {
  const params = new GetSecretValueCommand({
    SecretId: secretId
  })

  try {
    const { SecretString } = await secretsManager.send(params)

    if (!SecretString) {
      throw new Error('Secret not found')
    }
    
    if (json) {
      return JSON.parse(SecretString)
    }

    return SecretString
  } catch (err) {
    console.error(err)
    
    throw err
  }
}

module.exports = {
  getSecret
}
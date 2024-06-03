const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");

const secretsManager = new SecretsManagerClient({
  region: 'eu-central-1'
})

module.exports = secretsManager
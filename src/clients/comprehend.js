const { ComprehendClient } = require('@aws-sdk/client-comprehend')

const comprehend = new ComprehendClient({
  region: 'eu-central-1'
})

module.exports = comprehend

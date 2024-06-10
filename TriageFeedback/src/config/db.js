const { getSecret } = require('../lib/secrets-manager')

const getConfig = async () => {
  const secret = await getSecret(process.env.POSTGRES_SECRET_ID, true)

  const config = {
    host: secret.host,
    port: 5432,
    user: secret.username,
    password: secret.password,
    database: process.env.POSTGRES_DB
  }

  return config
}

module.exports = { getConfig }

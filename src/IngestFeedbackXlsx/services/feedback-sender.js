const { sendMessageBatch } = require('../../lib/sqs')

const enrichFeedbackRow = (row) => ({
  service: { S: 'cffld' },
  qualtrics_id: { S: row.qualtrics_id },
  source: { S: row.source },
  date_time: { S: row.date_time.toISOString() },
  browser: { S: row.browser },
  version: { S: row.version },
  operating_system: { S: row.operating_system },
  screen_size: { S: row.screen_size },
  rating: { S: row.rating },
  is_flood_risk_area: { S: row.is_flood_risk_area },
  is_station_issue: { S: row.is_station_issue },
  webchat_id: { S: row.webchat_id },
  duration: { N: `${row.duration}` },
  lat_long: { S: row.lat_long },
  comments: { S: row.comments }
})

const sendFeedbackRows = async (rows) => {
  const batchSize = 10;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)

    await sendMessageBatch(process.env.TRIAGE_QUEUE_URL, batch)
  }
}

module.exports = {
  sendFeedbackRows
}

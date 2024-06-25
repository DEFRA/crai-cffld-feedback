const takeScreenshot = require('../nodes/take-screenshot')
const triageFeedback = require('../nodes/triage-feedback')

const router = (state) => {
  if (state.check_comment.includes('Screenshot needed')) {
    console.log(
      '[ScreenshotRouter] Taking a screenshot for future use.'
    )

    return takeScreenshot.NAME
  }

  return triageFeedback.NAME
}

module.exports = { router }

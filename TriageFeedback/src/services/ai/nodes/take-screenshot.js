const playwright = require('playwright')

const NAME = 'screenshot_api'

const node = async (state) => {
  const browser = await playwright.chromium.launch()
  const page = await browser.newPage()

  await page.goto(state.feedback.source)
  await page.screenshot({ path: 'screenshot.png', fullPage: true })

  // save screenshot

  await browser.close()

  return {
    screenshot_taken: true
  }
}

module.exports = {
  NAME,
  node
}

const checkComment = require('./nodes/check-comment')
const takeScreenshot = require('./nodes/feedback-api')
const triageFeedback = require('./nodes/triage-feedback')
const screenshotNeededRouter = require('./routers/screenshot-needed')

const { END, START, StateGraph } = require('@langchain/langgraph')

const buildGraph = (state) => {
  const workflow = new StateGraph({
    channels: state
  })

  workflow
    .addNode(checkComment.NAME, checkComment.node)
    .addNode(takeScreenshot.NAME, takeScreenshot.node)
    .addNode(triageFeedback.NAME, triageFeedback.node)

  workflow
    .addEdge(START, checkComment.NAME)
    .addConditionalEdges(checkComment.NAME, screenshotNeededRouter)
    .addEdge(takeScreenshot.NAME, triageFeedback.NAME)
    .addEdge(triageFeedback.NAME, END)

  return workflow.compile()
}

const executeGraph = async (data) => {
  const state = {
    feedback: '',
    check_comment: '',
    screenshot_taken: ''
  }

  const graph = buildGraph(state)

  const response = await graph.invoke({
    feedback: JSON.stringify(data)
  })

  return response
}

module.exports = {
  executeGraph
}

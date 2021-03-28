import $ from 'jquery'
import $makeQuizPage from './$makeQuizPage'
import $makeScorePage from './$makeScorePage'

export {
  $printMessage,
  $printQuizPage,
  $printScorePage,
}

const $hideButtons = () => $(`button`).addClass(`hidden`)

function $addAnswerListeners(quizPage) {
  $(`[type='radio']`).on(`click`, e => {
    quizPage.answerIdx = parseInt(e.target.value, 10)
  })
}

function $printIntoMain($jqueryContent) {
  $(`main`).empty()
  $(`main`).append($jqueryContent)
}

function $printMessage(string) {
  const $message = $(`#message`)
  $message.removeClass().show()
  $(`#message`).text(string).addClass(`fade-out`)
}

function $printQuizPage(quizPage) {
  const $quizPage = $makeQuizPage(quizPage)
  $printIntoMain($quizPage)
  $addAnswerListeners(quizPage)
}

function $printScorePage(winningLanguage) {
  const $scorePage = $makeScorePage(winningLanguage)
  $hideButtons()
  $printIntoMain($scorePage)
}

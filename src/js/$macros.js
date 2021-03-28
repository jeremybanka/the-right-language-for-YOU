import $ from 'jquery'
import $makeQuizPage from './$makeQuizPage'
import $makeScorePage from './$makeScorePage'

export {
  $showNewMessage,
  $printQuizPage,
  $printScorePage,
}

function $showNewMessage(string) {
  const $message = $(`#message`)
  $message.text(string)
  $message.removeClass().show()
  $message.addClass(`fade-out`)
}

function $printQuizPage(quizPage) {
  const $quizPage = $makeQuizPage(quizPage)
  $replaceMainContentWith($quizPage)
  $addAnswerListeners(quizPage)
}

function $printScorePage(winningLanguage) {
  const $scorePage = $makeScorePage(winningLanguage)
  $hideButtons()
  $replaceMainContentWith($scorePage)
}

function $replaceMainContentWith($jqueryContent) {
  $(`main`).empty()
  $(`main`).append($jqueryContent)
}

function $addAnswerListeners(quizPage) {
  $(`[type='radio']`).on(`click`, e => {
    quizPage.idxOfYourAnswer = parseInt(e.target.value, 10)
  })
}

const $hideButtons = () => $(`button`).addClass(`hidden`)

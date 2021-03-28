import $ from 'jquery'
import quizPages from './quiz'

const LANGUAGE_NAMES = {
  js: `Javascript`,
  ruby: `Ruby`,
  hoon: `Hoon`,
}

function determineWinner(scoreSheet) {
  let indexOfWinner = 0
  let highScore = 0
  for(let idx = 0; idx < scoreSheet.length; idx++) {
    const languageResult = scoreSheet[idx]
    if(languageResult.score > highScore) {
      indexOfWinner = idx
      highScore = languageResult.score
    }
  }
  const idOfWinner = scoreSheet[indexOfWinner].id
  const winningLanguage = LANGUAGE_NAMES[idOfWinner]
  return winningLanguage
}
function scoreQuiz(pagesAnswered) {
  let jsTotal = 0
  let rubyTotal = 0
  let hoonTotal = 0
  for(let idx = 0; idx < pagesAnswered.length; idx++) {
    const page = pagesAnswered[idx]
    if(typeof page.answerIdx === `undefined`) return
    const chosenAnswer = page.possibleAnswers[page.answerIdx]
    const { js, ruby, hoon } = chosenAnswer.scores
    jsTotal += js
    rubyTotal += ruby
    hoonTotal += hoon
  }
  const scoreSheet = [
    { id: `js`, score: jsTotal },
    { id: `ruby`, score: rubyTotal },
    { id: `hoon`, score: hoonTotal },
  ]
  return scoreSheet
}
function getNextPage(pagesUnanswered, pagesAnswered, currentPage) {
  if(pagesUnanswered.length === 0) return
  if(currentPage) pagesAnswered.push(currentPage)
  return pagesUnanswered.pop()
}
function getPrevPage(pagesUnanswered, pagesAnswered, currentPage) {
  if(pagesAnswered.length === 0) return
  if(currentPage) pagesUnanswered.push(currentPage)
  return pagesAnswered.pop()
}
function sendMessage(string) {
  const $message = $(`#message`)
  $message.removeClass().show()
  $(`#message`).text(string).addClass(`fade-out`)
}
function listenToRadio(currentPage) {
  $(`[type='radio']`).on(`click`, e => {
    currentPage.answerIdx = parseInt(e.target.value, 10)
  })
}

function $RadioButton({ id, idx, checked }) {
  const $radio = $(`<input type='radio'>`)
  $radio.attr(`name`, id).attr(`value`, idx)
  if(checked) $radio.attr(`checked`, true)
  return $radio
}
function $PossibleAnswer({ possibleAnswer, idx, id, checked }) {
  const { text } = possibleAnswer
  const $label = $(`<label/>`)
  const $border = $(`<div class='border'/>`)
  const $textSpan = $(`<span/>`).text(text)
  return (
    $label.append(
      $RadioButton({ id, idx, checked }),
      $border,
      $textSpan
    )
  )
}
function $QuizPage(quizPage) {
  const { id, question, possibleAnswers, answerIdx } = quizPage
  const $question = $(`<ul id='question'><li>${question}</li></ul>`)
  const $responseForm = $(`<form id='response'/>`)
  for(let idx = 0; idx < possibleAnswers.length; idx++) {
    const possibleAnswer = possibleAnswers[idx]
    const checked = idx === answerIdx
    $responseForm.append($PossibleAnswer({ possibleAnswer, idx, id, checked }))
  }
  return [$question, $responseForm]
}
function $ScorePage(winningLanguage) {
  const scoreSummary = `${winningLanguage} was your most compatible language!`
  const $article = $(`<article/>`).text(scoreSummary)
  const $scorePage = $article.addClass(`score`)
  return $scorePage
}
$(() => {
  const pagesUnanswered = quizPages
  const pagesAnswered = []
  let currentPage
  currentPage = getNextPage(pagesUnanswered, pagesAnswered, currentPage)
  $(`main`).empty()
  $(`main`).append($QuizPage(currentPage))
  listenToRadio(currentPage)
  $(`button`).on(`click`, e => {
    e.preventDefault()
    const prevPageMemo = currentPage
    currentPage = e.target.id === `next`
      ? getNextPage(pagesUnanswered, pagesAnswered, currentPage)
      : getPrevPage(pagesUnanswered, pagesAnswered, currentPage)
    if(currentPage) {
      const { answerIdx } = prevPageMemo
      if(typeof answerIdx !== `undefined`) {
        const prevAnswer = prevPageMemo.possibleAnswers[answerIdx]
        sendMessage(prevAnswer.reply)
      }
      $(`main`).empty()
      $(`main`).append($QuizPage(currentPage))
      listenToRadio(currentPage)
    } else if(pagesUnanswered.length === 0) {
      const scoreSheet = scoreQuiz([...pagesAnswered, prevPageMemo])
      if(scoreSheet) {
        const winningLanguage = determineWinner(scoreSheet)
        $(`button`).hide()
        $(`main`).empty()
        $(`main`).append($ScorePage(winningLanguage))
      } else {
        sendMessage(`Finish the quiz before submitting!`)
        currentPage = prevPageMemo
      }
    } else {
      currentPage = prevPageMemo
    }
  })
})

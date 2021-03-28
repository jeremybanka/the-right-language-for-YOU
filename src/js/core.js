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
function scoreQuiz(pagesBehind) {
  let jsTotal = 0
  let rubyTotal = 0
  let hoonTotal = 0
  for(let idx = 0; idx < pagesBehind.length; idx++) {
    const page = pagesBehind[idx]
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
function turnPage({ currentPage, toward, leaving }) {
  if(toward.length === 0) return
  if(currentPage) leaving.unshift(currentPage)
  return toward.shift()
}
function $printMessage(string) {
  const $message = $(`#message`)
  $message.removeClass().show()
  $(`#message`).text(string).addClass(`fade-out`)
}
function $makeRadioButton({ id, idx, checked }) {
  const $radio = $(`<input type='radio'>`)
  $radio.attr(`name`, id).attr(`value`, idx)
  if(checked) $radio.attr(`checked`, true)
  return $radio
}
function $makeAnswerButton({ possibleAnswer, idx, id, checked }) {
  const { text } = possibleAnswer
  const $label = $(`<label/>`)
  const $border = $(`<div class='border'/>`)
  const $textSpan = $(`<span/>`).text(text)
  const $radioButton = $makeRadioButton({ id, idx, checked })
  return (
    $label.append(
      $radioButton,
      $border,
      $textSpan
    )
  )
}
function $makeQuizPage(quizPage) {
  const { id, question, possibleAnswers, answerIdx } = quizPage
  const $question = $(`<ul id='question'><li>${question}</li></ul>`)
  const $responseForm = $(`<form id='response'/>`)
  const $answerButtons = possibleAnswers.map((possibleAnswer, idx) => {
    const checked = idx === answerIdx
    return $makeAnswerButton({ possibleAnswer, idx, id, checked })
  })
  $responseForm.append($answerButtons)
  return [$question, $responseForm]
}
function $printQuizPage(page) {
  const $quizPage = $makeQuizPage(page)
  $(`main`).empty()
  $(`main`).append($quizPage)
  $(`[type='radio']`).on(`click`, e => {
    page.answerIdx = parseInt(e.target.value, 10)
  })
}
function $makeScorePage(winningLanguage) {
  const scoreSummary = `You should learn ${winningLanguage}`
  const $article = $(`<article/>`).text(scoreSummary)
  const $scorePage = $article.addClass(`score`)
  return $scorePage
}
$(() => {
  const pagesAhead = quizPages
  const pagesBehind = []
  let currentPage = turnPage({
    toward: pagesAhead,
    leaving: pagesBehind,
  })
  $printQuizPage(currentPage)
  $(`button`).on(`click`, e => {
    e.preventDefault()
    const pageMemo = currentPage
    const buttonId = e.target.id
    let toward; let leaving
    switch(buttonId) {
      case `next`: [toward, leaving] = [pagesAhead, pagesBehind]
        break
      case `prev`: [toward, leaving] = [pagesBehind, pagesAhead]
        break
      default: throw new Error(`unexpected button id`)
    }
    currentPage = turnPage({ currentPage, toward, leaving })
    if(currentPage) {
      const { answerIdx } = pageMemo
      if(typeof answerIdx !== `undefined`) {
        const prevAnswer = pageMemo.possibleAnswers[answerIdx]
        $printMessage(prevAnswer.reply)
      }
      $printQuizPage(currentPage)
    } else if(pagesAhead.length === 0) {
      const scoreSheet = scoreQuiz([...pagesBehind, pageMemo])
      if(scoreSheet) {
        const winningLanguage = determineWinner(scoreSheet)
        $(`button`).addClass(`hidden`)
        $(`main`).empty()
        $(`main`).append($makeScorePage(winningLanguage))
      } else {
        $printMessage(`Finish the quiz before submitting!`)
        currentPage = pageMemo
      }
    } else {
      currentPage = pageMemo
    }
  })
})

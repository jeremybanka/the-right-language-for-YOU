import $ from 'jquery'
import $makeQuizPage from './$makeQuizPage'
import $makeScorePage from './$makeScorePage'
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

function $printQuizPage(page) {
  const $quizPage = $makeQuizPage(page)
  $(`main`).empty()
  $(`main`).append($quizPage)
  $(`[type='radio']`).on(`click`, e => {
    page.answerIdx = parseInt(e.target.value, 10)
  })
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

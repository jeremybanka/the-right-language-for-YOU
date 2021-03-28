// STYLE
import '../styles/core.scss'
import '../styles/font-face.scss'
// UI LOGIC
import $ from 'jquery'
import { $printScorePage, $printQuizPage, $printMessage } from './$macros'
// BUSINESS LOGIC
import quizPages from './quiz'
import { turnPage, scoreQuiz, determineWinner } from './core'

$(() => {
  const [pagesBehind, pagesAhead] = [[], [...quizPages]]
  let currentPage = turnPage({
    toward: pagesAhead,
    leaving: pagesBehind,
  })
  $printQuizPage(currentPage)

  $(`button`).on(`click`, e => {
    e.preventDefault()
    const pageMemo = currentPage
    const buttonId = e.target.id
    const [toward, leaving] = (() => {
      switch(buttonId) {
        case `next`: return [pagesAhead, pagesBehind]
        case `prev`: return [pagesBehind, pagesAhead]
        default: throw new Error(`unexpected button id`)
      }
    })()
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
        $printScorePage(winningLanguage)
      } else {
        $printMessage(`Finish the quiz before submitting!`)
        currentPage = pageMemo
      }
    } else {
      currentPage = pageMemo
    }
  })
})

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
    const aPageWasFound = !!currentPage
    if(aPageWasFound) { // move along to next question
      const { answerIdx } = pageMemo
      const youDidntAnswer = typeof answerIdx !== `undefined`
      if(youDidntAnswer) {
        const prevAnswer = pageMemo.possibleAnswers[answerIdx]
        $printMessage(prevAnswer.reply)
      }
      $printQuizPage(currentPage)
    } else if(pagesAhead.length === 0) { // try to grade quiz
      const scoreSheet = scoreQuiz([...pagesBehind, pageMemo])
      const quizPassedInspection = !!scoreSheet
      if(quizPassedInspection) {
        const winningLanguage = determineWinner(scoreSheet)
        $printScorePage(winningLanguage)
      } else {
        $printMessage(`Hey, finish the quiz before submitting!`)
        currentPage = pageMemo
      }
    } else { // you're at the start of the quiz and nothing happens
      currentPage = pageMemo
    }
  })
})

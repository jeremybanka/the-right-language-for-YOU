// STYLE
import '../styles/core.scss'
import '../styles/font-face.scss'
// UI LOGIC
import $ from 'jquery'
import { $showNewMessage, $printQuizPage, $printScorePage } from './$macros'
// BUSINESS LOGIC
import { quizPages, possibleResults } from './quiz'
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
      const { idxOfYourAnswer } = pageMemo
      const youDidAnswer = typeof idxOfYourAnswer !== `undefined`
      if(youDidAnswer) {
        const yourAnswer = pageMemo.possibleAnswers[idxOfYourAnswer]
        const iHaveSomethingToSay = !!yourAnswer.myReply
        if(iHaveSomethingToSay) $showNewMessage(yourAnswer.myReply)
      }
      $printQuizPage(currentPage)
    } else if(pagesAhead.length === 0) { // try to grade quiz
      const scoreSheet = scoreQuiz([...pagesBehind, pageMemo])
      const quizPassedInspection = !!scoreSheet
      if(quizPassedInspection) {
        const idOfWinner = determineWinner(scoreSheet)
        const quizResult = possibleResults[idOfWinner]
        $printScorePage(quizResult)
      } else {
        $showNewMessage(`Hey, finish the quiz before submitting!`)
        currentPage = pageMemo
      }
    } else { // you're at the start of the quiz and nothing happens
      currentPage = pageMemo
    }
  })
})

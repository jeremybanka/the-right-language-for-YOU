export {
  turnPage,
  scoreQuiz,
  determineWinner,
}

function turnPage({ currentPage, toward, leaving }) {
  if(toward.length === 0) return
  if(currentPage) leaving.unshift(currentPage)
  const nextPage = toward.shift()
  return nextPage
}

function scoreQuiz(allPages) {
  let jsTotal = 0
  let rubyTotal = 0
  let hoonTotal = 0
  for(let idx = 0; idx < allPages.length; idx++) {
    const page = allPages[idx]
    const { possibleAnswers, idxOfYourAnswer } = page
    const quizIsUnfinished = typeof idxOfYourAnswer === `undefined`
    if(quizIsUnfinished) return // quiz fails inspection!
    const yourAnswer = possibleAnswers[idxOfYourAnswer]
    const { scores } = yourAnswer
    const { js, ruby, hoon } = scores || { js: 0, ruby: 0, hoon: 0 }
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
  return idOfWinner
}

export {
  turnPage,
  scoreQuiz,
  determineWinner,
}

function turnPage({ currentPage, toward, leaving }) {
  if(toward.length === 0) return
  if(currentPage) leaving.unshift(currentPage)
  return toward.shift()
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

function determineWinner(scoreSheet) {
  const languageNames = {
    js: `Javascript`,
    ruby: `Ruby`,
    hoon: `Hoon`,
  }
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
  const winningLanguage = languageNames[idOfWinner]
  return winningLanguage
}

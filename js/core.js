const LANGUAGE_NAMES = {
  js: `Javascript`,
  ruby: `Ruby`,
  hoon: `Hoon`,
}
const QUIZ_PAGES = [
  {
    id: `build`,
    question: `What do you want to build?`,
    possibleAnswers: [
      {
        text:
          `
          I want to build applications that process complex data 
          behind the scenes, giving the user powerful data and insights.
          `,
        scores: { js: 0, ruby: 2, hoon: 0 },
      },
      {
        text:
          `
          I want to make only the tastiest user interfaces and workflows.
          The DOM is my DOMain.
          `,
        scores: { js: 2, ruby: 0, hoon: 0 },
      },
      {
        text:
          `
          I want to build alien technology.
          `,
        scores: { js: 0, ruby: 1, hoon: 2 },
      },
    ],
  },
  {
    id: `verbosity`,
    question: `Do like words or symbols?`,
    possibleAnswers: [
      {
        text:
          `
          Words! Normal words are the best, even if they are long. 
          I hate having to remember weird shorthands for things,
          odd terminology, or arcane symbols.
          `,
        scores: { js: 2, ruby: 1, hoon: 0 },
      },
      {
        text:
          `
          I like words, but short words are best.
          `,
        scores: { js: 1, ruby: 2, hoon: 0 },
      },
      {
        text:
          `
          I like weird words and strange symbols. 
          They make me feel like a wizard.
          `,
        scores: { js: 0, ruby: 1, hoon: 2 },
      },
    ],
  },
  {
    id: `paradigm`,
    question: `Do you prefer declarative or imperative programming?`,
    possibleAnswers: [
      {
        text:
          `
          Declarative (functional languages are declarative.)
          `,
        scores: { js: 0, ruby: 2, hoon: 2 },
      },
      {
        text:
          `
          Imperative (object-oriented languages are imperative.)
          `,
        scores: { js: 2, ruby: 2, hoon: 0 },
      },
    ],
  },
  {
    id: `typing`,
    question: `Do you prefer static or dynamic typing?`,
    possibleAnswers: [
      {
        text:
          `
          Static
          `,
        scores: { js: 0, ruby: 0, hoon: 2 },
      },
      {
        text:
          `
          Dynamic
          `,
        scores: { js: 2, ruby: 2, hoon: 0 },
      },
    ],
  },
]

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
function print($content) {
  $(`main`).append($content)
}
function purge() {
  $(`main`).empty()
}
function $RadioButton({ id, idx }) {
  const $radio = $(`<input type='radio'>`)
  $radio.attr(`name`, id).attr(`value`, idx)
  return $radio
}
function $PossibleAnswer({ possibleAnswer, idx, id }) {
  const { text } = possibleAnswer
  const $label = $(`<label/>`)
  const $border = $(`<div class='border'/>`)
  const $textSpan = $(`<span/>`).text(text)
  return (
    $label.append(
      $RadioButton({ id, idx }),
      $border,
      $textSpan
    )
  )
}
function $QuizPage(quizPage) {
  const { id, question, possibleAnswers } = quizPage
  const $question = $(`<ul id='question'><li>${question}</li></ul>`)
  const $responseForm = $(`<form id='response'/>`)
  for(let idx = 0; idx < possibleAnswers.length; idx++) {
    const possibleAnswer = possibleAnswers[idx]
    $responseForm.append($PossibleAnswer({ possibleAnswer, idx, id }))
  }
  return [$question, $responseForm]
}
function $ScorePage(winningLanguage) {
  const content = `${winningLanguage} was your most compatible language!`
  const $article = $(`<article/>`).text(content)
  const $scorePage = $article.addClass(`score`)
  return $scorePage
}
$(() => {
  const pagesUnanswered = QUIZ_PAGES
  const pagesAnswered = []
  let currentPage
  currentPage = getNextPage(pagesUnanswered, pagesAnswered, currentPage)
  print($QuizPage(currentPage))
  $(`button[type='submit']`).on(`click`, e => {
    e.preventDefault()
    const currentPageMemo = currentPage
    currentPage = getNextPage(pagesUnanswered, pagesAnswered, currentPage)
    if(currentPage) {
      purge()
      print($QuizPage(currentPage))
    } else {
      const scoreSheet = scoreQuiz(pagesAnswered.push(currentPage))
      const winningLanguage = determineWinner(scoreSheet)
      console.log(scoreSheet, winningLanguage)
      if(winningLanguage) {
        purge()
        $(`footer`).hide()
        print($ScorePage(winningLanguage))
      } else {
        sendMessage(`Finish the quiz before submitting!`)
        currentPage = currentPageMemo
      }
    }
  })
  $(`button[type='button']`).on(`click`, () => {
    const currentPageMemo = currentPage
    currentPage = getPrevPage(pagesUnanswered, pagesAnswered, currentPage)
    if(currentPage) {
      purge()
      print($QuizPage(currentPage))
    } else {
      currentPage = currentPageMemo
    }
  })
  $(`[type='radio']`).on(`click`, e => currentPage.answerIdx = e.target.value)
})

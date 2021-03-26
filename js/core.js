const QUIZ_PAGES = [
  {
    id: `crypto`,
    question: `How many satoshis do you own?`,
    answer: null,
    possibleAnswers: [
      {
        text: `What's a "satoshi"?`,
        reply: ``,
      },
      {
        text: `Just a few, probably less than 100.`,
        reply: ``,
      },
      {
        text: `Millions and millions of them.`,
        reply: ``,
      },
    ],
  },
  {
    id: `fb`,
    question: `Why do you hate Facebook so much?`,
    answer: null,
    possibleAnswers: [
      {
        text: `It's so obnoxious how they always advertise at you.`,
        reply: `Totally!`,
      },
      {
        text: `
          They want to get me hooked on delicious 
          dopamine doses--and strung out!
        `,
        reply: `Dopamine dealers...`,
      },
      {
        text:
          `
            I don't like the idea that they're selling my data 
            without asking me.
          `,
        reply: `Right! Or paying?!`,
      },
      {
        text:
          `
            I don't hate Facebook! 
            It's just a website. 
            Why would I feel that way?
          `,
        reply: `'Zuckerberg is a spooky homunculus and shouldn't be trusted.'`,
      },
      {
        text:
          `
            Zuckerberg is a spooky homunculus who sends shivers down my spine.
          `,
        reply: ``,
      },
    ],
  },
]

function cleanUp() {
  $(`main`).empty()
}

function printPage(page) {
  const { id, question, answer, possibleAnswers } = page
  const $question = $(`<ul id='question'><li>${question}</li></ul>`)
  const $responseForm = $(`<form id='response'></form>`)
  for(let idx = 0; idx < possibleAnswers.length; idx++) {
    const possibleAnswer = possibleAnswers[idx]
    const $possibleAnswer = $(`<label/>`)
    const $radioButton = $(`<input type='radio'>`)
    $radioButton.attr(`name`, id).attr(`value`, idx)
    $($possibleAnswer).append($radioButton)
    $($possibleAnswer).append(`<div class='border'></div>`)
    $($possibleAnswer).append(`<span>${possibleAnswer.text}</span>`)
    $($responseForm).append($possibleAnswer)
  }
  $(`main`).append($question).append($responseForm)
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

$(() => {
  const pagesUnanswered = QUIZ_PAGES
  const pagesAnswered = []
  let currentPage
  currentPage = getNextPage(pagesUnanswered, pagesAnswered, currentPage)
  printPage(currentPage)
  $(`button[type='submit']`).on(`click`, e => {
    e.preventDefault()
    const currentPageMemo = currentPage
    currentPage = getNextPage(pagesUnanswered, pagesAnswered, currentPage)
    if(currentPage) {
      cleanUp()
      printPage(currentPage)
    } else {
      currentPage = currentPageMemo
    }
  })
  $(`button[type='button']`).on(`click`, () => {
    const currentPageMemo = currentPage
    currentPage = getPrevPage(pagesUnanswered, pagesAnswered, currentPage)
    if(currentPage) {
      cleanUp()
      printPage(currentPage)
    } else {
      currentPage = currentPageMemo
    }
  })
})

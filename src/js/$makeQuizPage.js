import $ from 'jquery'

export default function $makeQuizPage(quizPage) {
  const { id, question, possibleAnswers, idxOfYourAnswer } = quizPage
  const $question = $(`<ul id='question'><li>${question}</li></ul>`)
  const $responseForm = $(`<form id='response'/>`)
  const $answerButtons = $makeAnswerButtons(
    { possibleAnswers, idxOfYourAnswer, id }
  )
  $responseForm.append($answerButtons)
  return [$question, $responseForm]
}

function $makeAnswerButtons({ possibleAnswers, idxOfYourAnswer, id }) {
  return possibleAnswers.map((possibleAnswer, idx) => {
    const checked = idx === idxOfYourAnswer
    return $makeAnswerButton({ possibleAnswer, idx, id, checked })
  })
}

function $makeAnswerButton({ possibleAnswer, idx, id, checked }) {
  const { text } = possibleAnswer
  const $label = $(`<label/>`)
  const $border = $(`<div class='border'/>`)
  const $textSpan = $(`<span/>`).text(text)
  const $radioButton = $makeRadioButton({ id, idx, checked })
  const $answerButton = $label.append(
    $radioButton,
    $border,
    $textSpan
  )
  return $answerButton
}

function $makeRadioButton({ id, idx, checked }) {
  const $radioButton = $(`<input type='radio'>`)
  $radioButton.attr(`name`, id).attr(`value`, idx)
  if(checked) $radioButton.attr(`checked`, true)
  return $radioButton
}

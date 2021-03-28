import $ from 'jquery'

export default function $makeScorePage(quizResult) {
  const { id, nameOfLanguage, description, url } = quizResult
  const $scorePage = $(`<article/>`).addClass(`score`)
  const $graphic = $(`<img src='./src/images/${id}.svg'>`)
  const $summary = $(`<h2/>`).text(`You should learn ${nameOfLanguage}!`)
  const $details = $(`<p/>`).text(`${description}`)
  const $learnmore = $(`<a href='${url}'/>`).text(`${nameOfLanguage} Docs`)
  $scorePage.append([$graphic, $summary, $details, $learnmore])
  return $scorePage
}

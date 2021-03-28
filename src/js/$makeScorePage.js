import $ from 'jquery'

export default function $makeScorePage(winningLanguage) {
  const scoreSummaryText = `You should learn ${winningLanguage}`
  const $article = $(`<article/>`).text(scoreSummaryText)
  const $scorePage = $article.addClass(`score`)
  return $scorePage
}

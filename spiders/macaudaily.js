
export const delay = 1000

export const spiders = [
`
query q(
  $url: JSON!
) {
  page(url: $url) {
    children(selector: "a#pageLink") {
      text
      url
    }
  }
}
`,
`
query q(
  $url: JSON!
) {
  page(url: $url) {
    children(selector: "div[id^=mp] <") {
      text
      url
    }
  }
}
`,
`
query q(
  $url: JSON!
) {
  page(url: $url) {
    title:text(selector: "table#table15 table:nth-child(3) strong")
    content:html(selector: "table#table15 table:nth-child(3)")
    date:date(selector: "table#table23", from: "YYYY年M月DD日")
  }
}
`,
]

export const url = 'http://www.macaodaily.com'

export const limit = 10

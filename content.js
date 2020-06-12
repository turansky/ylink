const codeElements = document.getElementsByTagName('code')
const codeElementCount = codeElements.length

for (let i = 0; i < codeElementCount; i++) {
  const element = codeElements[i]
  const content = element.textContent
  const id = getId(element.textContent)
  if (!id) {
    continue
  }

  element.textContent = ''

  const href = isClassId(id)
    ? `https://docs.yworks.com/yfileshtml/#/api/${id}`
    : `https://docs.yworks.com/yfileshtml/#/search/${id}`

  const a = document.createElement('a')
  a.href = href
  a.textContent = content
  element.append(a)
}

function getId (text) {
  if (text === 'NaN' || text === 'RequireJS') return undefined
  if (text.indexOf('SVG') === 0) return undefined

  return text.split('.')[0]
}

function isClassId (id) {
  const firstChar = id.charAt(0)
  return firstChar === firstChar.toUpperCase() &&
    id !== id.toUpperCase()
}

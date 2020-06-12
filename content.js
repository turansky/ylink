const codeElements = document.getElementsByTagName('code')
const codeElementCount = codeElements.length

for (let i = 0; i < codeElementCount; i++) {
  const element = codeElements[i]
  const ids = getIds(element.textContent)
  if (!ids) {
    continue
  }

  element.textContent = ''

  const [id, memberId] = ids
  element.append(createAnchor(id, true))

  if (!memberId) {
    continue
  }

  element.append('.')
  element.append(createAnchor(memberId, false))
}

function getIds (text) {
  if (text === 'NaN' || text === 'RequireJS') return undefined
  if (text.indexOf('SVG') === 0) return undefined

  const ids = text.split('.')
  if (ids.length > 2) return undefined
  return ids
}

function isClassId (id) {
  const firstChar = id.charAt(0)
  return firstChar === firstChar.toUpperCase() &&
    id !== id.toUpperCase()
}

function createAnchor (id, checkClassMode) {
  const href = checkClassMode && isClassId(id)
    ? `https://docs.yworks.com/yfileshtml/#/api/${id}`
    : `https://docs.yworks.com/yfileshtml/#/search/${id}`

  const a = document.createElement('a')
  a.href = href
  a.textContent = id
  return a
}

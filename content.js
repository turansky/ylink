const IGNORED_IDS = [
  'null',
  'false',
  'true',
  'NaN',
  'rtl',
  'RequireJS'
]

const NON_ID_SYMBOLS = [
  ' ', '$', '-', '<'
]

const codeElements = document.getElementsByTagName('code')

for (let element of codeElements) {
  const ids = getIds(element.textContent)
  if (!ids) {
    continue
  }

  element.textContent = ''
  element.append(createAnchor(ids))
}

function getIds (text) {
  if (IGNORED_IDS.includes(text)) return undefined
  if (NON_ID_SYMBOLS.some(symbol => text.includes(symbol))) return undefined
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

function getHref (ids) {
  const [id, childId] = ids

  if (!!childId) {
    return `https://docs.yworks.com/yfileshtml/#/api/${id}#${childId}`
  }

  return isClassId(id)
    ? `https://docs.yworks.com/yfileshtml/#/api/${id}`
    : `https://docs.yworks.com/yfileshtml/#/search/${id}`
}

function createAnchor (ids) {
  const a = document.createElement('a')
  a.href = getHref(ids)
  a.textContent = ids.join('.')
  return a
}

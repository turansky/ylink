const codeElements = document.getElementsByTagName('code')
const codeElementCount = codeElements.length

for (let i = 0; i < codeElementCount; i++) {
  const element = codeElements[i]
  const content = element.textContent
  const classId = getClassId(element.textContent)
  if (!classId) {
    continue
  }

  element.textContent = ''

  const a = document.createElement('a')
  a.href = `https://docs.yworks.com/yfileshtml/#/api/${classId}`
  a.textContent = content
  element.append(a)
}

function getClassId (text) {
  const firstChar = text.charAt(0)
  if (firstChar !== firstChar.toUpperCase()) return undefined
  if (text === text.toUpperCase()) return undefined
  if (text === text.toLowerCase()) return undefined
  if (text === 'NaN' || text === 'RequireJS') return undefined
  if (text.indexOf('SVG') === 0) return undefined

  return text.split('.')[0]
}

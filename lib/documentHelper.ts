export function getDocumentStyles(): string {
  let styles = ''
  for (let styleSheet of document.styleSheets) {
    try {
      if (styleSheet.cssRules) {
        for (let cssRule of styleSheet.cssRules) {
          styles += cssRule.cssText
        }
      }
    } catch (e) {}
  }
  return styles
}

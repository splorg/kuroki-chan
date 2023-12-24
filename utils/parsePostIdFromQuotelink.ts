export const parsePostIdFromQuotelink = (href: string) => {
  return href.replace('#p', '')
}
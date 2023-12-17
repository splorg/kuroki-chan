export const dateStringFromTimestamp = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000)

  const dateString = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo'
  }).format(date)

  return dateString
}
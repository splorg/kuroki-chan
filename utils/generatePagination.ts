export const generatePagination = (current: number, total: number) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  if (current <= 3) return [1, 2, 3, '...', total - 1, total]

  if (current >= total - 2) return [1, 2, '...', total - 2, total - 1, total]

  return [1, '...', current - 1, current, current + 1, '...', total]
}
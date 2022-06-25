export function formatDate(date?: Date | string | number) {
  return date
    ? new Date(date).toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      })
    : '-'
}

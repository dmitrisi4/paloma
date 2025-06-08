/**
 * Форматирует дату в удобочитаемый формат
 * @param dateString - строка с датой в формате ISO
 * @returns отформатированная дата
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Проверка на валидность даты
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Форматирование даты в локализованный формат
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Сокращает текст до указанной длины и добавляет многоточие
 * @param text - исходный текст
 * @param maxLength - максимальная длина
 * @returns сокращенный текст
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
}
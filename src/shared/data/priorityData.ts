export const PRIORITIES = {
  low: {
    label: 'Низкий',
    color: '#90a4ae',
    icon: 'low-icon.svg',
  },
  lower_medium: {
    label: 'Ниже среднего',
    color: '#fbc02d',
    icon: 'lower-medium-icon.svg',
  },
  medium: {
    label: 'Средний',
    color: '#fbc02d',
    icon: 'medium-icon.svg',
  },
  upper_medium: {
    label: 'Выше среднего',
    color: '#29ccc6',
    icon: 'upper-medium-icon.svg',
  },
  high: {
    label: 'Высокий',
    color: '#e53935',
    icon: 'high-icon.svg',
  },
} as const;

export type Priority = keyof typeof PRIORITIES;

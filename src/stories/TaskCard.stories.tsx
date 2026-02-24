import type { Meta, StoryObj } from '@storybook/react-vite';
import TaskCard from '../entities/task/ui/task-card/task-card';

const meta: Meta<typeof TaskCard> = {
  component: TaskCard,
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const InProgressLow: Story = {
  args: {
    title: 'Фото склада для отчёта',
    status: 'in_progress',
    priority: 'low',
    author: 'Константинов П. Р.',
    createDate: '09.08.2023',
    assigne: 'Перламутровый П. Р.',
    controller: 'Петрякова У. Я.',
    planDate: '14.08.23',
    comments: [],
    attachments: [],
  },
};

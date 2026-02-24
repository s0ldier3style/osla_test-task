import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePicker from '../entities/task/ui/create-task/datetime-picker/date-picker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Empty: Story = {
  args: {
    value: '',
    onChange: (date) => console.log('Date selected', date),
  },
};

export const WithValue: Story = {
  args: {
    value: '2025-12-31', // формат YYYY-MM-DD
    onChange: (date) => console.log('Date selected', date),
  },
};

export const Interactive: Story = {
  render: () => {
    const [date, setDate] = useState('');
    return <DatePicker value={date} onChange={setDate} />;
  },
};

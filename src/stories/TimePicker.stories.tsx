import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TimePicker from '../entities/task/ui/create-task/datetime-picker/time-picker';

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Empty: Story = {
  args: {
    value: '',
    onChange: (time) => console.log('Time selected', time),
  },
};

export const WithValue: Story = {
  args: {
    value: '14:30',
    onChange: (time) => console.log('Time selected', time),
  },
};

export const Interactive: Story = {
  render: () => {
    const [time, setTime] = useState('');
    return <TimePicker value={time} onChange={setTime} />;
  },
};

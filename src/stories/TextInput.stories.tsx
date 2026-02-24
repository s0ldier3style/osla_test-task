import type { Meta, StoryObj } from '@storybook/react-vite';
import TextInput from '../shared/ui/input/text-input';
import { useState } from 'react';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: (e) => e.preventDefault,
    placeholder: 'Введите',
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Введите'
      />
    );
  },
};

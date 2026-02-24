import type { Meta, StoryObj } from '@storybook/react';
import Option from '../entities/task/ui/create-task/option/option';
import { useState } from 'react';

const meta: Meta<typeof Option> = {
  component: Option,
  args: {
    options: [
      { value: 'none', label: 'Не напоминать' },
      { value: 'hour', label: 'За час' },
      { value: 'day', label: 'За день' },
      { value: 'week', label: 'За неделю' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedValue || 'none');
    return (
      <Option
        {...args}
        selectedValue={selected}
        onChange={(value) => setSelected(value)}
      />
    );
  },
};

export const SelectedDay: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('day');
    return (
      <Option
        {...args}
        selectedValue={selected}
        onChange={(value) => setSelected(value)}
      />
    );
  },
};

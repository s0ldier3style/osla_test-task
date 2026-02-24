import type { Meta, StoryObj } from '@storybook/react-vite';
import PriorityButton from '../entities/task/ui/create-task/priority-button/priority-button';

const meta: Meta<typeof PriorityButton> = {
  component: PriorityButton,
};

export default meta;
type Story = StoryObj<typeof PriorityButton>;

export const ButtonDefault: Story = {
  args: {
    priority: 'low',
    selected: false,
  },
};

export const ButtonSelected: Story = {
  args: {
    priority: 'low',
    selected: true,
  },
};

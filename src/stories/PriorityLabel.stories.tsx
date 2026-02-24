import type { Meta, StoryObj } from '@storybook/react-vite';
import PriorityProps from '../shared/ui/priority/priority';

const meta: Meta<typeof PriorityProps> = {
  component: PriorityProps,
};

export default meta;
type Story = StoryObj<typeof PriorityProps>;

export const LowPriority: Story = {
  args: {
    priority: 'low',
  },
};

export const LowerMediumPriority: Story = {
  args: {
    priority: 'lower_medium',
  },
};

export const MediumPriority: Story = {
  args: {
    priority: 'medium',
  },
};

export const UpperMediumPriority: Story = {
  args: {
    priority: 'upper_medium',
  },
};

export const HighPriority: Story = {
  args: {
    priority: 'high',
  },
};

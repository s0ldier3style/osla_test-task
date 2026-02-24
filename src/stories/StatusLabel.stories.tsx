import type { Meta, StoryObj } from '@storybook/react-vite';
import Status from '../shared/ui/status/status';

const meta: Meta<typeof Status> = {
  component: Status,
};

export default meta;
type Story = StoryObj<typeof Status>;

export const InProgress: Story = {
  args: {
    status: 'in_progress',
  },
};

export const Completed: Story = {
  args: {
    status: 'completed',
  },
};

export const Expired: Story = {
  args: {
    status: 'expired',
  },
};

export const onReview: Story = {
  args: {
    status: 'on_review',
  },
};

export const Default: Story = {
  args: {
    status: 'in_progress',
  },
};

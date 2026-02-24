import type { Meta, StoryObj } from '@storybook/react-vite';
import PriorityPanel from '../entities/task/ui/create-task/priority-panel/priority-panel';

const meta: Meta<typeof PriorityPanel> = {
  component: PriorityPanel,
};

export default meta;
type Story = StoryObj<typeof PriorityPanel>;

export const Panel: Story = {
  args: {},
};

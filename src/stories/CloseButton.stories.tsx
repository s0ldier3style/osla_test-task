import type { Meta, StoryObj } from '@storybook/react';
import CloseButton from '../shared/ui/close-button/close-button';
import { fn } from 'storybook/test';

const meta: Meta<typeof CloseButton> = {
  component: CloseButton,
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {};

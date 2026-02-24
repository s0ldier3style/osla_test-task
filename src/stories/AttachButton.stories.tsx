import type { Meta, StoryObj } from '@storybook/react';
import AttachButton from '../shared/ui/attach-button/attach-button';
import { fn } from 'storybook/test';

const meta: Meta<typeof AttachButton> = {
  component: AttachButton,
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof AttachButton>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import OptionsButton from '../shared/ui/options-button/options-button';

const meta: Meta<typeof OptionsButton> = {
  component: OptionsButton,
};

export default meta;
type Story = StoryObj<typeof OptionsButton>;

export const Default: Story = {};

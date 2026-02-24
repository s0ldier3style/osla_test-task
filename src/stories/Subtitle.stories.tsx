import type { Meta, StoryObj } from '@storybook/react';
import Subtitle from '../shared/ui/subtitle/subtitle';

const meta: Meta<typeof Subtitle> = {
  component: Subtitle,
  argTypes: {
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Subtitle>;

export const Default: Story = {
  args: {
    subtitle: 'Название поля',
    required: false,
  },
};

export const Required: Story = {
  args: {
    subtitle: 'Обязательное поле',
    required: true,
  },
};

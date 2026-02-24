import type { Meta, StoryObj } from '@storybook/react';
import Button from '../shared/ui/button/button';
import { fn } from 'storybook/test';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    color: { control: 'radio', options: ['blue', 'white'] },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Blue: Story = {
  args: {
    color: 'blue',
    children: 'Синяя кнопка',
  },
};

export const White: Story = {
  args: {
    color: 'white',
    children: 'Белая кнопка',
  },
};

export const WithIcon: Story = {
  args: {
    color: 'blue',
    children: (
      <>
        <img
          src='/icons/attach.svg'
          alt=''
          style={{ width: 16, marginRight: 8 }}
        />
        Прикрепить файл
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    color: 'blue',
    children: 'Неактивная кнопка',
    disabled: true,
  },
};

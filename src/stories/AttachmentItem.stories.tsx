import type { Meta, StoryObj } from '@storybook/react';
import AttachmentItem from '../shared/ui/attachments/attachments';
import { fn } from 'storybook/test';

const meta: Meta<typeof AttachmentItem> = {
  component: AttachmentItem,
  argTypes: {
    onRemove: { action: 'removed' },
  },
};

export default meta;
type Story = StoryObj<typeof AttachmentItem>;

export const Docx: Story = {
  args: {
    attachment: { id: 1, name: 'document.docx' },
    onRemove: fn(),
  },
};

export const Jpg: Story = {
  args: {
    attachment: { id: 2, name: 'photo.jpg' },
    onRemove: fn(),
  },
};

export const Other: Story = {
  args: {
    attachment: { id: 3, name: 'archive.zip' },
    onRemove: fn(),
  },
};

export const WithoutRemove: Story = {
  args: {
    attachment: { id: 4, name: 'readme.txt' },
    onRemove: undefined, // или не передавать
  },
};

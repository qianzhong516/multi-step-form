import type { Meta, StoryObj } from '@storybook/react';
import { Link as Component } from '../link';

const meta = {
    title: 'Base/Link',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Link: Story = {
    args: {
        variant: 'secondary',
        children: 'Link',
    },
};

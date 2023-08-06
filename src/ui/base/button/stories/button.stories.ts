import type { Meta, StoryObj } from '@storybook/react';
import { Button as Component } from '../button';

const meta = {
    title: 'Base/Button',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
    args: {
        variant: 'primary',
        title: 'Next Step',
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Confirmation as Component } from '../confirmation';

const meta = {
    title: 'Multi-step Form/Confirmation',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Confirmation: Story = {
    args: {},
};

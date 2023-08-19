import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton as Component } from '../toggle_button';

const meta = {
    title: 'Base/ToggleButton',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefautOff: Story = {
    args: {
        defaultValue: 'Monthly',
        value: {
            on: 'Monthly',
            off: 'Yearly',
        },
    },
};

export const DefautOn: Story = {
    args: {
        defaultValue: 'Yearly',
        value: {
            on: 'Monthly',
            off: 'Yearly',
        },
    },
};

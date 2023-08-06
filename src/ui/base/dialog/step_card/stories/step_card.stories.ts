import type { Meta, StoryObj } from '@storybook/react';
import { StepCard as Component } from '../step_card';

const meta = {
    title: 'Base/Dialog/StepCard',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StepCard: Story = {
    args: {
        stepNumber: 1,
        stepName: 'Your Info',
        isActive: false,
    },
};

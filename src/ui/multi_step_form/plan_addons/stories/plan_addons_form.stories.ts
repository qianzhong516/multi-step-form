import type { Meta, StoryObj } from '@storybook/react';
import { PlanAddonsForm as Component } from '../plan_addons_form';

const meta = {
    title: 'Multi-step Form/PlanAddons',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PlanAddonsForm: Story = {
    args: {
        recurringType: 'monthly',
        addons: [{ type: 'onlineService', price: 9 }],
    },
};

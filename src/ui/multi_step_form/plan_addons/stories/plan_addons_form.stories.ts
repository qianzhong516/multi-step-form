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
        addons: [{ type: 'onlineService', price: 9 }],
        getAddonOption: () => {
            return {
                type: 'monthly',
                options: [
                    {
                        name: 'Online service',
                        description: 'Access to multiplayer games',
                        price: 9,
                    },
                    {
                        name: 'Larger storage',
                        description: 'Extra 1TB of cloud save',
                        price: 12,
                    },
                    {
                        name: 'Customizable profile',
                        description: 'Custom theme on your profile',
                        price: 15,
                    },
                ],
            };
        },
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Summary as Component } from '../summary';

const meta = {
    title: 'Multi-step Form/Summary',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Summary: Story = {
    args: {
        planDetails: { type: 'monthly', planType: 'advanced', price: 12 },
        addons: [
            { type: 'onlineService', price: 9 },
            { type: 'largerStorage', price: 12 },
        ],
    },
};

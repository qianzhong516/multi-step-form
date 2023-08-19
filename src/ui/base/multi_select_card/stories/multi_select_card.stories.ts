import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelectCard as Component } from '../multi_select_card';

const meta = {
    title: 'Base/MultiSelectCard',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MultiSelectCard: Story = {
    args: {
        title: 'Online service',
        subtitle: 'Access to multiplayer games',
        displayValue: '+$10/yr',
        isSelected: true,
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Icon as Component } from '../icon';
import { advancedIcon } from '../../icon_image/icon_image';

const meta = {
    title: 'Base/Icon',
    component: Component,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: {
                type: 'select',
            },
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'small' },
            },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {
    args: {
        size: 'small',
        img: advancedIcon,
    },
};

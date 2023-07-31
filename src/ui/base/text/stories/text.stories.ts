import type { Meta, StoryObj } from '@storybook/react';
import { InternalText as Typography } from '../text';

const meta = {
    title: 'Base/Typography',
    component: Typography,
    tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
    args: {
        type: 'text',
        variant: 'primary',
        size: 'large',
        children: 'Hello World',
    },
};

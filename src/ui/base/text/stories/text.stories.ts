import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../text';

const meta = {
    title: 'Base/Text',
    component: Text,
    tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'small',
    },
};

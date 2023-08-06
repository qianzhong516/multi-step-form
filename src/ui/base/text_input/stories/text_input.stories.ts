import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '../text_input';

const meta = {
    title: 'Base/TextInput',
    component: TextInput,
    tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Input: Story = {
    args: {
        title: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { PersonalInfoForm as Component } from '../personal_info_form';
const meta = {
    title: 'Multi-step Form/PersonalInfo',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PersonalInfoForm: Story = {
    args: {},
};

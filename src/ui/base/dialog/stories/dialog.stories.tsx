import type { Meta, StoryObj } from '@storybook/react';
import { Dialog as Component } from '../dialog';

const meta = {
    title: 'Base/Dialog',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dialog: Story = {
    args: {
        currentStep: 'personalInfo',
        steps: {
            personalInfo: 'Your info',
            selectPlan: 'Select plan',
            addons: 'add-ons',
            summary: 'summary',
        },
        title: 'Personal Info',
        subtitle: 'Please provide your name, email address, and phone number',
        Content: () => <div>Content area</div>,
        Footer: () => <div>Footer</div>,
    },
};

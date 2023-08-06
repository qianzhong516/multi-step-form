import type { Meta, StoryObj } from '@storybook/react';
import {} from '@storybook/addon-controls';
import { Dialog as Component, Footer } from '../dialog';
import { Placeholder } from '../../placeholder/placeholder';

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
        Content: () => (
            <Placeholder width='100%' height='100%' title='Content Area' />
        ),
        Footer: () => (
            <Placeholder width='100%' height={100} title='Footer Area' />
        ),
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Dialog as Component } from '../dialog';
import { Placeholder } from '../../placeholder/placeholder';

const currentStepOptions = ['personalInfo', 'selectPlan', 'addons', 'summary'];

const meta = {
    title: 'Base/Dialog',
    component: Component,
    tags: ['autodocs'],
    argTypes: {
        currentStep: {
            options: currentStepOptions,
            control: {
                type: 'select',
            },
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: currentStepOptions[0] },
            },
        },
    },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dialog: Story = {
    args: {
        currentStep: currentStepOptions[0],
        steps: {
            personalInfo: 'Your info',
            selectPlan: 'Select plan',
            addons: 'add-ons',
            summary: 'summary',
        },
        title: 'Personal Info',
        subtitle: 'Please provide your name, email address, and phone number',
        content: (
            <Placeholder width='100%' height='100%' title='Content Area' />
        ),
        footer: <Placeholder width='100%' height={100} title='Footer Area' />,
    },
};

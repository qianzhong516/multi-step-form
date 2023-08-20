import type { Meta, StoryObj } from '@storybook/react';
import { SelectPlanForm as Component } from '../select_plan_form';
import React from 'react';
import { PlanDetails, RecurringVariant } from '../../../../types';

const meta = {
    title: 'Multi-step Form/SelectPlan',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectPlanForm: Story = {
    render: (args) => {
        const [planDetails, setPlanDetails] = React.useState<PlanDetails>({
            type: 'monthly',
            planType: 'arcade',
            price: 9,
        });
        const onChange = (value: PlanDetails) => {
            setPlanDetails(value);
        };

        return (
            <Component
                {...args}
                currentPlanDetails={planDetails}
                onChange={onChange}
            />
        );
    },
    args: {
        getPlanSelectOptions: (type: RecurringVariant) => {
            switch (type) {
                case 'monthly':
                    return {
                        type: 'monthly',
                        options: [
                            { name: 'arcade', price: 9 },
                            { name: 'advanced', price: 12 },
                            { name: 'pro', price: 15 },
                        ],
                    };
                case 'yearly':
                    return {
                        type: 'yearly',
                        options: [
                            { name: 'arcade', price: 90 },
                            { name: 'advanced', price: 120 },
                            { name: 'pro', price: 150 },
                        ],
                    };
                default:
                    throw new Error('Invalid recurring type.');
            }
        },
    },
};

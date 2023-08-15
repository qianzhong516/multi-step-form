import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    Step,
    PlanDetails,
} from '../../../types';

const monthlyPlanDetails: PlanDetails = {
    type: 'monthly',
    details: {
        arcade: 9,
        advanced: 12,
        pro: 15,
    },
};

const yearlyPlanDetails: PlanDetails = {
    type: 'yearly',
    details: {
        arcade: 90,
        advanced: 120,
        pro: 150,
    },
};

export function createSelectPlanStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SELECT_PLAN> {
    return ({ navigationProvider }) => {
        console.log('createSelectPlanStep: ', sharedState);

        return {
            step: Step.SELECT_PLAN,
            structure: {
                title: 'Select your plan',
                subtitle: 'You have the option of monthly or yearly billing.',
                content: <div>Content</div>,
                onNext: () =>
                    navigationProvider.goNext({
                        sharedState: {
                            selectPlan: {
                                type: 'yearly',
                                details: {
                                    arcade: 19,
                                    advanced: 112,
                                    pro: 115,
                                },
                            },
                        },
                    }),
                onBack: () => navigationProvider.goBack({ sharedState }),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

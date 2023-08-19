import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    Step,
    PlanDetails,
} from '../../../types';
import { SelectPlanForm } from './select_plan_form';

export function createSelectPlanStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SELECT_PLAN> {
    return ({ navigationProvider, formHandler }) => {
        const onChange = (value: PlanDetails) => {
            formHandler?.setFormData(Step.SELECT_PLAN, value);
        };
        const formData = formHandler?.getFormData(Step.SELECT_PLAN);

        return {
            step: Step.SELECT_PLAN,
            structure: {
                title: 'Select your plan',
                subtitle: 'You have the option of monthly or yearly billing.',
                content: (
                    <SelectPlanForm
                        planType={formData?.type}
                        planDetails={formData}
                        onChange={onChange}
                    />
                ),
                onNext: () =>
                    navigationProvider.goNext({
                        sharedState: {
                            ...sharedState,
                            selectPlan: formHandler?.getFormData(
                                Step.SELECT_PLAN
                            ),
                        },
                    }),
                onBack: () => navigationProvider.goBack({ sharedState }),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

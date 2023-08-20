import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    Step,
    PlanDetails,
    RecurringVariant,
} from '../../../types';
import { SelectPlanForm } from './select_plan_form';

export function createSelectPlanStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SELECT_PLAN> {
    return ({ navigationProvider, formHandler, sharedStateController }) => {
        const onChange = (value: PlanDetails) => {
            formHandler?.setCurrentFormData(Step.SELECT_PLAN, value);
            sharedStateController.updateAddons(value.type);
        };

        const getPlanSelectOptions = (type: RecurringVariant) => {
            return sharedStateController.getPlanSelectOptions(type);
        };

        const formData = formHandler?.getCurrentFormData(Step.SELECT_PLAN);

        return {
            step: Step.SELECT_PLAN,
            structure: {
                title: 'Select your plan',
                subtitle: 'You have the option of monthly or yearly billing.',
                content: (
                    <SelectPlanForm
                        currentPlanDetails={formData}
                        onChange={onChange}
                        getPlanSelectOptions={getPlanSelectOptions}
                    />
                ),
                onNext: () =>
                    navigationProvider.goNext({
                        sharedState,
                    }),
                onBack: () => navigationProvider.goBack({ sharedState }),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

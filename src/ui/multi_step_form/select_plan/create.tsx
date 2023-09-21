import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    Step,
    PlanDetails,
    RecurringVariant,
    MainStep,
    SharedState,
} from '../../../types';
import { SelectPlanForm } from './select_plan_form';
import { SelectPlanPresenter } from './presenter';

export function createSelectPlanStep({
    flowStore,
    options: {},
}: CreateStepArgs<Step, MainStep, SharedState>): CreateStepStructure<
    Step,
    Step.SELECT_PLAN,
    SharedState
> {
    return ({ navigationProvider, formHandler }) => {
        const formData = formHandler.getFormData(Step.SELECT_PLAN);

        const presenter = new SelectPlanPresenter(
            formHandler.getFormData(Step.ADD_ONS),
            formHandler.getAddonOptions()
        );
        const onChange = (value: PlanDetails) => {
            formHandler.setFormData(Step.SELECT_PLAN, value);
            const updatedAddons = presenter.getUpdatedAddons(value.type);
            if (updatedAddons) {
                formHandler.setFormData(Step.ADD_ONS, updatedAddons);
            }
        };

        const getPlanSelectOptions = (type: RecurringVariant) => {
            return formHandler!.getPlanSelectOptions(type);
        };

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
                onNext: () => navigationProvider.goNext(),
                onBack: () => navigationProvider.goBack(),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

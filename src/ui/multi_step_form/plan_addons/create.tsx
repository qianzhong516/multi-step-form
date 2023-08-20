import type {
    CreateStepArgs,
    CreateStepStructure,
    AddonDetails,
} from '../../../types';
import { Step } from '../../../types';
import { PlanAddonsForm } from './plan_addons_form';
import React from 'react';

export function createPlanAddonsStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.ADD_ONS> {
    return ({ navigationProvider, formHandler }) => {
        const onChange = (isSelected: boolean, value: AddonDetails) => {
            const selectedAddons = formHandler?.getFormData(Step.ADD_ONS) ?? [];
            if (isSelected) {
                formHandler?.setFormData(Step.ADD_ONS, [
                    ...selectedAddons,
                    value,
                ]);
                return;
            }
            // remove the deselected addon item
            formHandler?.setFormData(
                Step.ADD_ONS,
                selectedAddons.filter((addon) => addon.type !== value.type)
            );
        };
        const selectedAddons = formHandler?.getFormData(Step.ADD_ONS);

        return {
            step: Step.ADD_ONS,
            structure: {
                title: 'Pick add-ons',
                subtitle: 'Addons help enhance your gaming experience.',
                content: (
                    <PlanAddonsForm
                        onChange={onChange}
                        recurringType={formHandler?.getRecurringType()}
                        addons={selectedAddons}
                    />
                ),
                onBack: () => navigationProvider.goBack({ sharedState }),
                onNext: () => navigationProvider.goNext({ sharedState }),
            },
        };
    };
}

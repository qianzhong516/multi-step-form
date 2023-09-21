import type {
    CreateStepArgs,
    CreateStepStructure,
    AddonDetails,
    MainStep,
    SharedState,
} from '../../../types';
import { Step } from '../../../types';
import { PlanAddonsForm } from './plan_addons_form';
import React from 'react';

export function createPlanAddonsStep({
    flowStore,
    options: {},
}: CreateStepArgs<Step, MainStep, SharedState>): CreateStepStructure<
    Step,
    Step.ADD_ONS,
    SharedState
> {
    return ({ navigationProvider, formHandler }) => {
        const onChange = (isSelected: boolean, value: AddonDetails) => {
            const formData = formHandler.getFormData(Step.ADD_ONS);
            if (isSelected) {
                formHandler.setFormData(Step.ADD_ONS, {
                    ...formData,
                    items: [...formData.items, value],
                });
                return;
            }
            // remove the deselected addon item
            formHandler?.setFormData(Step.ADD_ONS, {
                ...formData,
                items: formData.items.filter(
                    (addon) => addon.type !== value.type
                ),
            });
        };

        const getAddonOption = () => {
            // TODO: clean up
            return formHandler.getFormData(Step.ADD_ONS).type === 'monthly'
                ? formHandler.getAddonOptions()[0]
                : formHandler.getAddonOptions()[1];
        };

        const selectedAddons = formHandler.getFormData(Step.ADD_ONS).items;

        return {
            step: Step.ADD_ONS,
            structure: {
                title: 'Pick add-ons',
                subtitle: 'Addons help enhance your gaming experience.',
                content: (
                    <PlanAddonsForm
                        getAddonOption={getAddonOption}
                        onChange={onChange}
                        addons={selectedAddons}
                    />
                ),
                onBack: () => navigationProvider.goBack(),
                onNext: () => navigationProvider.goNext(),
            },
        };
    };
}

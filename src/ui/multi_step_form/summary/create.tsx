import { CreateStepArgs, CreateStepStructure, Step } from '../../../types';
import React from 'react';
import { Summary } from './summary';

export function createSummaryStep({
    flowStore,
    options: {},
}: CreateStepArgs): CreateStepStructure<Step.SUMMARY> {
    return ({ navigationProvider, formHandler }) => {
        return {
            step: Step.SUMMARY,
            structure: {
                title: 'Finishing up',
                subtitle: 'Double-check everything looks OK before confirming.',
                content: (
                    <Summary
                        planDetails={formHandler!.getFormData(Step.SELECT_PLAN)}
                        addons={formHandler!.getFormData(Step.ADD_ONS).items}
                    />
                ),
                onBack: () => navigationProvider.goBack(),
                onNext: () => navigationProvider.goNext(),
            },
        };
    };
}

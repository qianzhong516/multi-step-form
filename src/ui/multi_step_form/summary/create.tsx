import {
    CreateStepArgs,
    CreateStepStructure,
    MainStep,
    SharedState,
    Step,
} from '../../../types';
import React from 'react';
import { Summary } from './summary';

export function createSummaryStep({
    flowStore,
    options: {},
}: CreateStepArgs<Step, MainStep, SharedState>): CreateStepStructure<
    Step,
    Step.SUMMARY,
    SharedState
> {
    return ({ navigationProvider, formHandler }) => {
        const onChangePlan = () => {
            navigationProvider.goTo({ step: Step.SELECT_PLAN });
        };

        return {
            step: Step.SUMMARY,
            structure: {
                title: 'Finishing up',
                subtitle: 'Double-check everything looks OK before confirming.',
                content: (
                    <Summary
                        planDetails={formHandler.getFormData(Step.SELECT_PLAN)}
                        addons={formHandler.getFormData(Step.ADD_ONS).items}
                        onChangePlan={onChangePlan}
                    />
                ),
                onBack: () => navigationProvider.goBack(),
                onNext: () => navigationProvider.goNext(),
            },
        };
    };
}

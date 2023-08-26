import { CreateStepArgs, CreateStepStructure, Step } from '../../../types';
import React from 'react';
import { Summary } from './summary';

export function createSummaryStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SUMMARY> {
    return ({ navigationProvider, sharedStateController }) => {
        return {
            step: Step.SUMMARY,
            structure: {
                title: 'Finishing up',
                subtitle: 'Double-check everything looks OK before confirming.',
                content: (
                    <Summary
                        planDetails={{
                            type: 'monthly',
                            planType: 'arcade',
                            price: 0,
                        }}
                        addons={[]}
                    />
                ),
                onBack: () => navigationProvider.goBack({ sharedState }),
                onNext: () => navigationProvider.goNext({ sharedState }),
            },
        };
    };
}

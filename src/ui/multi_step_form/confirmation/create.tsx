import React from 'react';
import { CreateStepArgs, CreateStepStructure, Step } from '../../../types';
import { Confirmation } from './confirmation';

export function createConfirmationStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SUMMARY> {
    return ({ navigationProvider }) => {
        return {
            step: Step.SUMMARY,
            structure: {
                content: <Confirmation />,
            },
        };
    };
}

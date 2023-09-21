import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    MainStep,
    SharedState,
    Step,
} from '../../../types';
import { Confirmation } from './confirmation';

export function createConfirmationStep({
    flowStore,
    options: {},
}: CreateStepArgs<Step, MainStep, SharedState>): CreateStepStructure<
    Step,
    Step.SUMMARY,
    SharedState
> {
    return ({ navigationProvider }) => {
        return {
            step: Step.SUMMARY,
            structure: {
                content: <Confirmation />,
            },
        };
    };
}

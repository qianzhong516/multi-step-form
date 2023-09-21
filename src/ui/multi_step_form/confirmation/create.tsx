import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    MainStep,
    Step,
} from '../../../types';
import { Confirmation } from './confirmation';

export function createConfirmationStep({
    flowStore,
    options: {},
}: CreateStepArgs<Step, MainStep>): CreateStepStructure<Step, Step.SUMMARY> {
    return ({ navigationProvider }) => {
        return {
            step: Step.SUMMARY,
            structure: {
                content: <Confirmation />,
            },
        };
    };
}

import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    FlowSequence,
    MainStep,
    SharedState,
    Step,
} from './types';
import { FlowStoreImpl as FlowStore } from './flowStore';
import { createPersonalInfoStep } from './ui/multi_step_form/personal_info/create';
import { createSelectPlanStep } from './ui/multi_step_form/select_plan/create';
import { createPlanAddonsStep } from './ui/multi_step_form/plan_addons/create';
import { createSummaryStep } from './ui/multi_step_form/summary/create';
import { NavigationProviderImpl as NavigationProvider } from './navigationProvider';

export const steps: Record<MainStep, string> = {
    personalInfo: 'Your info',
    selectPlan: 'Select plan',
    addons: 'add-ons',
    summary: 'summary',
};

const sharedState: SharedState = {
    selectPlan: {
        type: 'monthly',
        planType: 'arcade',
        price: 9,
    },
    addons: {
        type: 'monthly',
        items: [],
    },
};

const flowSequence: FlowSequence = {
    personalInfo: {
        subsequence: [],
    },
    selectPlan: {
        subsequence: [],
    },
    addons: {
        subsequence: [],
    },
    summary: {
        subsequence: [Step.CONFIRMATION],
    },
};

export const flowStore = new FlowStore(
    {
        personalInfo: createPersonalInfoStep,
        selectPlan: createSelectPlanStep,
        addons: createPlanAddonsStep,
        summary: createSummaryStep,
        confirmation: createConfirmationStep,
    },
    Step.PERSONAL_INFO,
    sharedState,
    flowSequence
);

export const navigationProvider = new NavigationProvider(flowStore);

function createConfirmationStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SUMMARY> {
    return ({ navigationProvider }) => {
        return {
            step: Step.SUMMARY,
            structure: {
                title: 'Confirmation',
                subtitle: 'Confirmation subtitle',
                content: <div>Content</div>,
            },
        };
    };
}

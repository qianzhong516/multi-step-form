import { FlowSequence, MainStep, SharedState, Step, SubStep } from './types';
import { FlowStoreImpl as FlowStore } from './flowStore';
import { createPersonalInfoStep } from './ui/multi_step_form/personal_info/create';
import { createSelectPlanStep } from './ui/multi_step_form/select_plan/create';
import { createPlanAddonsStep } from './ui/multi_step_form/plan_addons/create';
import { createSummaryStep } from './ui/multi_step_form/summary/create';
import { createConfirmationStep } from './ui/multi_step_form/confirmation/create';

export const steps: Record<MainStep, string> = {
    personalInfo: 'Your info',
    selectPlan: 'Select plan',
    addons: 'add-ons',
    summary: 'summary',
};

const flowSequence: FlowSequence<MainStep, SubStep> = {
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

export const flowStore = new FlowStore<Step, MainStep, SubStep, SharedState>(
    {
        personalInfo: createPersonalInfoStep,
        selectPlan: createSelectPlanStep,
        addons: createPlanAddonsStep,
        summary: createSummaryStep,
        confirmation: createConfirmationStep,
    },
    Step.PERSONAL_INFO,
    flowSequence
);

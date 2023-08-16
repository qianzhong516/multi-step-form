import {
    type Flow,
    type CreateStepArgs,
    type CreateStepStructure,
    type MainStep,
    type FlowSequence,
    type SharedState,
    Step,
} from './types';
import { FlowStoreImpl as FlowStore } from './flowStore';
import { NavigationProviderImpl as NavigationProvider } from './navigationProvider';
import React from 'react';
import { createPersonalInfoStep } from './ui/multi_step_form/personal_info/create';
import { createSelectPlanStep } from './ui/multi_step_form/select_plan/create';
import { Dialog, Footer as DialogFooter } from '../src/ui/base/dialog/dialog';
import type { FooterProps as DialogFooterProps } from '../src/ui/base/dialog/dialog';
import { MultiStepFormHandlerImpl as MultiStepFormHandler } from './formHandler';
import { PersonalInfoFormHandler } from './ui/multi_step_form/personal_info/formHandler';

const steps: Record<MainStep, string> = {
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

const flowStore = new FlowStore(
    {
        personalInfo: createPersonalInfoStep,
        selectPlan: createSelectPlanStep,
        addons: createAddonsStep,
        summary: createSummaryStep,
        confirmation: createConfirmationStep,
    },
    Step.PERSONAL_INFO,
    sharedState,
    flowSequence
);
const navigationProvider = new NavigationProvider(flowStore);

function App() {
    const [rerenderCount, setRerenderCount] = React.useState(0);
    // shared state across all steps
    const [multiStepFormData, setMultiStepFormData] =
        React.useState<SharedState>({
            // TODO: Fix. The selectPlan shared state should only contain one
            // plan with its pricing
            selectPlan: {
                type: 'monthly',
                planType: 'arcade',
                price: 9,
            },
        });

    const multiStepFormHandler = new MultiStepFormHandler(
        multiStepFormData,
        setMultiStepFormData,
        {
            personalInfo: new PersonalInfoFormHandler(
                multiStepFormData.personalInfo
            ),
            selectPlan: undefined,
            addons: undefined,
            summary: undefined,
        }
    );

    const Footer = ({ onNext, onBack, ...props }: DialogFooterProps) => {
        const onNextHandler = () => {
            onNext?.();
            setRerenderCount(rerenderCount + 1);
        };

        const onBackHandler = () => {
            onBack?.();
            setRerenderCount(rerenderCount + 1);
        };

        return (
            <DialogFooter
                onBack={onBack && onBackHandler}
                onNext={onNext && onNextHandler}
                {...props}
            />
        );
    };

    if (flowStore.createCurrentStep == null) {
        // TODO: if current step does not exist, close the dialog
        navigationProvider.close();
        return <div>Error. The subsequent node does not exist.</div>;
    }

    const { step, structure: stepStructure } = flowStore.createCurrentStep({
        navigationProvider,
        formHandler: multiStepFormHandler,
    });

    return (
        <Dialog
            currentStep={step}
            steps={steps}
            title={stepStructure.title}
            subtitle={stepStructure.subtitle}
            content={stepStructure.content}
            footer={
                <Footer
                    disabledNext={!multiStepFormHandler.canSubmit(step)}
                    onBack={stepStructure.onBack}
                    onNext={stepStructure.onNext}
                />
            }
        />
    );
}

function createAddonsStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.ADD_ONS> {
    return ({ navigationProvider }) => {
        console.log('createAddonsStep: ', sharedState);

        return {
            step: Step.ADD_ONS,
            structure: {
                title: 'Addons',
                subtitle: 'Addons subtitle',
                content: <div>Content</div>,
                onBack: () => navigationProvider.goBack({ sharedState }),
                onNext: () => navigationProvider.goNext({ sharedState }),
            },
        };
    };
}

function createSummaryStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SUMMARY> {
    return ({ navigationProvider }) => {
        console.log('createSummaryStep: ', sharedState);

        return {
            step: Step.SUMMARY,
            structure: {
                title: 'Summary',
                subtitle: 'Summary subtitle',
                content: <div>Content</div>,
                onBack: () => navigationProvider.goBack({ sharedState }),
                onNext: () => navigationProvider.goNext({ sharedState }),
            },
        };
    };
}

function createConfirmationStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.SUMMARY> {
    return ({ navigationProvider }) => {
        console.log('createSummaryStep: ', sharedState);

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

export default App;

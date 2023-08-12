import type {
    Flow,
    CreateStepArgs,
    CreateStepStructure,
    MainStep,
    FlowSequence,
    SharedState,
} from './types';
import { FlowStoreImpl as FlowStore } from './flowStore';
import { NavigationProviderImpl as NavigationProvider } from './navigationProvider';
import React from 'react';
import { createPersonalInfoStep } from './ui/multi_step_form/personal_info/create';
import { Dialog, Footer as DialogFooter } from '../src/ui/base/dialog/dialog';
import type { FooterProps as DialogFooterProps } from '../src/ui/base/dialog/dialog';

const flow: Flow = {
    personalInfo: createPersonalInfoStep,
    selectPlan: createSelectPlanStep,
    addons: createAddonsStep,
    summary: createSummaryStep,
    confirmation: createConfirmationStep,
};

const steps: Record<MainStep, string> = {
    personalInfo: 'Your info',
    selectPlan: 'Select plan',
    addons: 'add-ons',
    summary: 'summary',
};

const sharedState: SharedState = {
    plan: {
        type: 'monthly',
        details: {
            arcade: 9,
            advanced: 12,
            pro: 15,
        },
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
        subsequence: ['confirmation'],
    },
};

const flowStore = new FlowStore(
    flow,
    'personalInfo',
    sharedState,
    flowSequence
);
const navigationProvider = new NavigationProvider(flowStore);

function App() {
    const [rerenderCount, setRerenderCount] = React.useState(0);

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
                    onBack={stepStructure.onBack}
                    onNext={stepStructure.onNext}
                />
            }
        />
    );
}

function createSelectPlanStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        console.log('createSelectPlanStep: ', sharedState);

        return {
            step: 'selectPlan',
            structure: {
                title: 'SelectPlan',
                subtitle: 'SelectPlan subtitle',
                content: <div>Content</div>,
                onNext: () =>
                    navigationProvider.goNext({
                        sharedState: {
                            plan: {
                                type: 'yearly',
                                details: {
                                    arcade: 19,
                                    advanced: 112,
                                    pro: 115,
                                },
                            },
                        },
                    }),
                onBack: () => navigationProvider.goBack({ sharedState }),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

function createAddonsStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        console.log('createAddonsStep: ', sharedState);

        return {
            step: 'addons',
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
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        console.log('createSummaryStep: ', sharedState);

        return {
            step: 'summary',
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
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        console.log('createSummaryStep: ', sharedState);

        return {
            step: 'summary',
            structure: {
                title: 'Confirmation',
                subtitle: 'Confirmation subtitle',
                content: <div>Content</div>,
            },
        };
    };
}

export default App;

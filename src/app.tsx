import type { Flow, CreateStepArgs, CreateStepStructure } from './types';
import { FlowStoreImpl as FlowStore } from './flowStore';
import { NavigationProviderImpl as NavigationProvider } from './navigationProvider';
import React from 'react';

const flow: Flow = {
    personalInfo: createPersonalInfoStep,
    selectPlan: createSelectPlanStep,
    addons: createAddonsStep,
    // TODO: update
    summary: createAddonsStep,
    confirmation: createAddonsStep,
};

const flowStore = new FlowStore(flow, 'personalInfo', {
    plan: {
        type: 'monthly',
        details: {
            arcade: 9,
            advanced: 12,
            pro: 15,
        },
    },
});
const navigationProvider = new NavigationProvider(flowStore);

function App() {
    const [rerenderCount, setRerenderCount] = React.useState(0);

    const Footer = ({
        onNext,
        onBack,
    }: {
        onNext?(): void;
        onBack?(): void;
    }) => {
        const onNextHandler = () => {
            onNext?.();
            setRerenderCount(rerenderCount + 1);
        };

        const onBackHandler = () => {
            onBack?.();
            setRerenderCount(rerenderCount + 1);
        };

        return (
            <>
                {onBack && <button onClick={onBackHandler}>Back</button>}
                {onNext && <button onClick={onNextHandler}>Next</button>}
            </>
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
        <div>
            {stepStructure && (
                <>
                    <div>{stepStructure.title}</div>
                    <div>{stepStructure.subtitle}</div>
                    <Footer
                        onNext={stepStructure.onNext}
                        onBack={stepStructure.onBack}
                    />
                </>
            )}
        </div>
    );
}

function createPersonalInfoStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        console.log('createPersonalInfoStep: ', sharedState);

        return {
            step: 'personalInfo',
            structure: {
                title: 'Personal Info',
                subtitle: 'Personal Info subtitle',
                Content: () => <div>Content</div>,
                onNext: () =>
                    navigationProvider.goNext({
                        sharedState: {
                            personalInfo: {
                                email: 'zhongqian516@gmail.com',
                            },
                        },
                    }),
                onClose: () => navigationProvider.close(),
            },
        };
    };
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
                Content: () => <div>Content</div>,
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
                Content: () => <div>Content</div>,
                onBack: () => navigationProvider.goBack({ sharedState }),
                onNext: () => navigationProvider.goNext({ sharedState }),
            },
        };
    };
}

export default App;

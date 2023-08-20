import {
    type CreateStepArgs,
    type CreateStepStructure,
    type MainStep,
    type FlowSequence,
    type SharedState,
    Step,
    PlanSelectOption,
    AddonOption,
} from './types';
import { FlowStoreImpl as FlowStore } from './flowStore';
import { NavigationProviderImpl as NavigationProvider } from './navigationProvider';
import React from 'react';
import { createPersonalInfoStep } from './ui/multi_step_form/personal_info/create';
import { createSelectPlanStep } from './ui/multi_step_form/select_plan/create';
import { createPlanAddonsStep } from './ui/multi_step_form/plan_addons/create';
import { Dialog, Footer as DialogFooter } from '../src/ui/base/dialog/dialog';
import type { FooterProps as DialogFooterProps } from '../src/ui/base/dialog/dialog';
import { MultiStepFormHandlerImpl as MultiStepFormHandler } from './formHandler';
import { PersonalInfoFormHandler } from './ui/multi_step_form/personal_info/formHandler';
import { SelectPlanFormHandler } from './ui/multi_step_form/select_plan/formHandler';
import { PlanAddonsFormHandler } from './ui/multi_step_form/plan_addons/formHandler';
import { SharedStateControllerImpl as SharedStateController } from './sharedStateController';

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

const flowStore = new FlowStore(
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
const navigationProvider = new NavigationProvider(flowStore);

function App() {
    const [rerenderCount, setRerenderCount] = React.useState(0);
    const planSelectOptions = React.useRef<PlanSelectOption[]>([]);
    const addonOptions = React.useRef<AddonOption[]>([]);
    // shared state across all steps
    const [multiStepFormData, setMultiStepFormData] =
        React.useState<SharedState>({
            selectPlan: {
                type: 'monthly',
                planType: 'arcade',
                price: 9,
            },
            addons: {
                type: 'monthly',
                items: [],
            },
        });

    console.log(multiStepFormData);

    const updateMultiStepFormData = (data: Partial<SharedState>) => {
        setMultiStepFormData((prev) => ({ ...prev, ...data }));
    };

    const multiStepFormHandler = new MultiStepFormHandler(
        multiStepFormData,
        updateMultiStepFormData,
        {
            personalInfo: new PersonalInfoFormHandler(
                multiStepFormData.personalInfo
            ),
            selectPlan: new SelectPlanFormHandler(),
            addons: new PlanAddonsFormHandler(),
            summary: undefined,
        }
    );

    const setPlanSelectOptions = (options: PlanSelectOption[]) => {
        planSelectOptions.current = options;
    };

    const setAddonOptions = (options: AddonOption[]) => {
        addonOptions.current = options;
    };

    const sharedStateController = new SharedStateController(
        multiStepFormData,
        updateMultiStepFormData,
        planSelectOptions.current,
        addonOptions.current,
        setPlanSelectOptions,
        setAddonOptions
    );

    React.useEffect(() => {
        // TODO: handle error state
        sharedStateController.load();
    }, []);

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
        sharedStateController,
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

import React from 'react';
import { type SharedState, PlanSelectOption, AddonOption } from './types';
import { Dialog, Footer as DialogFooter } from '../src/ui/base/dialog/dialog';
import { MultiStepFormHandlerImpl as MultiStepFormHandler } from './formHandler';
import { PersonalInfoFormHandler } from './ui/multi_step_form/personal_info/formHandler';
import { SelectPlanFormHandler } from './ui/multi_step_form/select_plan/formHandler';
import { PlanAddonsFormHandler } from './ui/multi_step_form/plan_addons/formHandler';
import { navigationProvider, flowStore, steps } from './init_app';

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
        // make sure form data is updated in correct order
        setMultiStepFormData((prev) => ({ ...prev, ...data }));
    };

    const setPlanSelectOptions = (options: PlanSelectOption[]) => {
        planSelectOptions.current = options;
    };

    const setAddonOptions = (options: AddonOption[]) => {
        addonOptions.current = options;
    };

    const multiStepFormHandler = new MultiStepFormHandler(
        multiStepFormData,
        planSelectOptions.current,
        addonOptions.current,
        updateMultiStepFormData,
        {
            personalInfo: new PersonalInfoFormHandler(
                multiStepFormData.personalInfo
            ),
            selectPlan: new SelectPlanFormHandler(),
            addons: new PlanAddonsFormHandler(),
            summary: undefined,
        },
        setPlanSelectOptions,
        setAddonOptions
    );

    React.useEffect(() => {
        // TODO: handle error state
        multiStepFormHandler.load();
    }, []);

    if (flowStore.createCurrentStep == null) {
        // TODO: if current step does not exist, close the dialog
        navigationProvider.close();
        return <div>Error. The subsequent node does not exist.</div>;
    }

    const { step, structure: stepStructure } = flowStore.createCurrentStep({
        navigationProvider,
        formHandler: multiStepFormHandler,
    });

    const onBackHandler = () => {
        stepStructure.onBack?.();
        setRerenderCount(rerenderCount + 1);
    };

    const onNextHandler = () => {
        stepStructure.onNext?.();
        setRerenderCount(rerenderCount + 1);
    };

    const footer = (
        <DialogFooter onBack={onBackHandler} onNext={onNextHandler} />
    );

    return (
        <Dialog
            currentStep={step}
            steps={steps}
            title={stepStructure.title}
            subtitle={stepStructure.subtitle}
            content={stepStructure.content}
            footer={footer}
        />
    );
}

export default App;

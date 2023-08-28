import React from 'react';
import { type SharedState, PlanSelectOption, AddonOption } from './types';
import { Dialog, Footer as DialogFooter } from '../src/ui/base/dialog/dialog';
import { MultiStepFormHandlerImpl as MultiStepFormHandler } from './formHandler';
import { PersonalInfoFormHandler } from './ui/multi_step_form/personal_info/formHandler';
import { SelectPlanFormHandler } from './ui/multi_step_form/select_plan/formHandler';
import { PlanAddonsFormHandler } from './ui/multi_step_form/plan_addons/formHandler';
import { flowStore, steps } from './init_app';
import { NavigationProviderImpl as NavigationProvider } from './navigationProvider';
import { SummaryFormHandler } from './ui/multi_step_form/summary/formHandler';
import styles from './app.css';

function App() {
    const [_, _rerenderStep] = React.useState(0);
    const [planSelectOptions, setPlanSelectOptions] = React.useState<
        PlanSelectOption[]
    >([]);
    const [addonOptions, setAddonOptions] = React.useState<AddonOption[]>([]);
    // the form data across all steps
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

    React.useEffect(() => {
        // TODO: handle error state
        multiStepFormHandler
            .load()
            .then(({ addonOptions, planSelectOptions }) => {
                setAddonOptions(addonOptions);
                setPlanSelectOptions(planSelectOptions);
            });
    }, []);

    const rerenderStep = React.useCallback(
        () => _rerenderStep((prev) => ++prev),
        []
    );
    const updateMultiStepFormData = React.useCallback(
        (data: Partial<SharedState>) => {
            // make sure form data is updated in correct order
            setMultiStepFormData((prev) => ({ ...prev, ...data }));
        },
        []
    );

    const navigationProvider = React.useMemo(
        () => new NavigationProvider(flowStore, rerenderStep),
        []
    );
    const multiStepFormHandler = React.useMemo(
        () =>
            new MultiStepFormHandler(
                multiStepFormData,
                planSelectOptions,
                addonOptions,
                updateMultiStepFormData,
                {
                    personalInfo: new PersonalInfoFormHandler(
                        multiStepFormData.personalInfo
                    ),
                    selectPlan: new SelectPlanFormHandler(),
                    addons: new PlanAddonsFormHandler(),
                    summary: new SummaryFormHandler(),
                }
            ),
        [multiStepFormData, planSelectOptions, addonOptions]
    );

    const createCurrentStep = flowStore.createCurrentStep;
    if (createCurrentStep == null) {
        // TODO: if current step does not exist, close the dialog
        navigationProvider.close();
        return <div>Error. The subsequent node does not exist.</div>;
    }
    const { step, structure: stepStructure } = createCurrentStep({
        navigationProvider,
        formHandler: multiStepFormHandler,
    });

    const footer = (
        <DialogFooter
            onBack={stepStructure.onBack}
            onNext={stepStructure.onNext}
            disabledNext={!multiStepFormHandler.canSubmit(step)}
        />
    );

    return (
        <div className={styles.app}>
            <Dialog
                currentStep={step}
                steps={steps}
                title={stepStructure.title}
                subtitle={stepStructure.subtitle}
                content={stepStructure.content}
                footer={footer}
            />
        </div>
    );
}

export default App;

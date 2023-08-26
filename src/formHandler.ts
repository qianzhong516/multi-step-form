import {
    type FormHandler,
    type MainStep,
    type MultiStepFormHandler,
    type SharedState,
    Step,
    RecurringVariant,
    PlanSelectOption,
    AddonOption,
    AddonDetails,
} from './types';

// the form handler related to the current step only
export class MultiStepFormHandlerImpl<T extends MainStep>
    implements MultiStepFormHandler<T>
{
    constructor(
        // proxy to the `multiStepFormData` state
        private formData: SharedState,
        private planSelectOptions: PlanSelectOption[],
        private addonOptions: AddonOption[],
        // proxy to the `setMultiStepFormData`
        private updateFormData: (formData: Partial<SharedState>) => void,
        private readonly formHandlerFactory: Record<
            MainStep,
            FormHandler | undefined
        >,
        private setPlanSelectOptions: (options: PlanSelectOption[]) => void,
        private setAddonOptions: (options: AddonOption[]) => void
    ) {}

    async load() {
        const [addonOptions, planSelectOptions] = await Promise.all([
            this.fetchAddonOptions(),
            this.fetchPlanSelectOptions(),
        ]);
        this.setPlanSelectOptions(planSelectOptions);
        this.setAddonOptions(addonOptions);
    }

    private async fetchAddonOptions(): Promise<AddonOption[]> {
        return new Promise((res, _) => {
            setTimeout(() => {
                res([monthlyAddonList, yearlyAddonList]);
            }, 500);
        });
    }

    private async fetchPlanSelectOptions(): Promise<PlanSelectOption[]> {
        return new Promise((res, _) => {
            setTimeout(() => {
                res([monthlyPlanDetails, yearlyPlanDetails]);
            }, 500);
        });
    }

    private getFormHandler(step: T) {
        return this.formHandlerFactory[step];
    }

    getAddonOptions() {
        return this.addonOptions;
    }

    getPlanSelectOptions(type: RecurringVariant) {
        return type === 'monthly'
            ? this.planSelectOptions[0]
            : this.planSelectOptions[1];
    }

    getFormData() {
        return this.formData;
    }

    setFormData<U extends MainStep>(step: U, data: SharedState[U]) {
        this.updateFormData({ [step]: data });
    }

    getCurrentFormData(step: T) {
        return this.formData[step];
    }

    setCurrentFormData(step: T, data: SharedState[keyof SharedState]) {
        this.updateFormData({ [step]: data });
    }

    canSubmit(step: T) {
        return !!this.getFormHandler(step)?.canSubmit;
    }
}

const monthlyPlanDetails: PlanSelectOption = {
    type: 'monthly',
    options: [
        { name: 'arcade', price: 9 },
        { name: 'advanced', price: 12 },
        { name: 'pro', price: 15 },
    ],
};

const yearlyPlanDetails: PlanSelectOption = {
    type: 'yearly',
    options: [
        { name: 'arcade', price: 90 },
        { name: 'advanced', price: 120 },
        { name: 'pro', price: 150 },
    ],
};
const monthlyAddonList: AddonOption = {
    type: 'monthly',
    options: [
        {
            name: 'Online service',
            description: 'Access to multiplayer games',
            price: 9,
        },
        {
            name: 'Larger storage',
            description: 'Extra 1TB of cloud save',
            price: 12,
        },
        {
            name: 'Customizable profile',
            description: 'Custom theme on your profile',
            price: 15,
        },
    ],
};

const yearlyAddonList: AddonOption = {
    type: 'yearly',
    options: [
        {
            name: 'Online service',
            description: 'Access to multiplayer games',
            price: 10,
        },
        {
            name: 'Larger storage',
            description: 'Extra 1TB of cloud save',
            price: 20,
        },
        {
            name: 'Customizable profile',
            description: 'Custom theme on your profile',
            price: 20,
        },
    ],
};

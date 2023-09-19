import {
    type FormHandler,
    type MainStep,
    type MultiStepFormHandler,
    type SharedState,
    RecurringVariant,
    PlanSelectOption,
    AddonOption,
} from './types';

/**
 * MultiStepFormHandler loads the static options to show in the steps.
 * It also acts as a proxy to the form data state for reading and
 * writing the form data in each step.
 */
export class MultiStepFormHandlerImpl implements MultiStepFormHandler {
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
        >
    ) {}

    async load() {
        const [addonOptions, planSelectOptions] = await Promise.all([
            this.fetchAddonOptions(),
            this.fetchPlanSelectOptions(),
        ]);
        return { addonOptions, planSelectOptions };
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

    private getFormHandler<T extends MainStep>(step: T) {
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

    getFormData<U extends MainStep>(step: U): SharedState[U] {
        return this.formData[step];
    }

    setFormData<U extends MainStep>(step: U, data: SharedState[U]) {
        this.updateFormData({ [step]: data });
    }

    getCurrentFormData<T extends MainStep>(step: T) {
        return this.formData[step];
    }

    setCurrentFormData<T extends MainStep>(
        step: T,
        data: SharedState[keyof SharedState]
    ) {
        this.updateFormData({ [step]: data });
    }

    canSubmit<T extends MainStep>(step: T) {
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

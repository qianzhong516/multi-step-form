import {
    monthlyAddonList,
    monthlyPlanDetails,
    yearlyAddonList,
    yearlyPlanDetails,
} from './data';
import {
    type FormHandler,
    type MultiStepFormHandler,
    RecurringVariant,
    PlanSelectOption,
    AddonOption,
} from './types';

/**
 * MultiStepFormHandler loads the static options to show in the steps.
 * It also acts as a proxy to the form data state for reading and
 * writing the form data in each step.
 */
export class MultiStepFormHandlerImpl<SharedState>
    implements MultiStepFormHandler<SharedState>
{
    constructor(
        // proxy to the `multiStepFormData` state
        private formData: SharedState,
        private planSelectOptions: PlanSelectOption[],
        private addonOptions: AddonOption[],
        // proxy to the `setMultiStepFormData`
        private updateFormData: <U extends keyof SharedState>(
            formData: Record<string, SharedState[U]>
        ) => void,
        private readonly formHandlerFactory: Record<
            keyof SharedState,
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
        // setTimeout to simulate an api call
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

    private getFormHandler<U extends keyof SharedState>(step: U) {
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

    getFormData<U extends keyof SharedState>(step: U): SharedState[U] {
        return this.formData[step];
    }

    setFormData<U extends keyof SharedState>(step: U, data: SharedState[U]) {
        this.updateFormData({ [step]: data });
    }

    canSubmit<U extends keyof SharedState>(step: U) {
        return !!this.getFormHandler(step)?.canSubmit;
    }
}

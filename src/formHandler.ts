import {
    type FormHandler,
    type MainStep,
    type MultiStepFormHandler,
    type SharedState,
    Step,
    RecurringVariant,
} from './types';

// the form handler related to the current step only
export class MultiStepFormHandlerImpl<T extends MainStep>
    implements MultiStepFormHandler<T>
{
    constructor(
        // proxy to the `multiStepFormData` state
        private formData: SharedState,
        // proxy to the `setMultiStepFormData`
        private updateFormData: (formData: Partial<SharedState>) => void,
        private readonly formHandlerFactory: Record<
            MainStep,
            FormHandler | undefined
        >
    ) {}

    private getFormHandler(step: T) {
        return this.formHandlerFactory[step];
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

import {
    type FormHandler,
    type MainStep,
    type MultiStepFormHandler,
    type SharedState,
} from './types';

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

    getFormData(step: T) {
        return this.formData[step];
    }

    setFormData(step: T, data: SharedState[keyof SharedState]) {
        this.updateFormData({ ...this.formData, [step]: data });
    }

    canSubmit(step: T) {
        return !!this.getFormHandler(step)?.canSubmit;
    }
}

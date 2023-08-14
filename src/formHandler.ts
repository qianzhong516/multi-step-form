import {
    Step,
    type FormHandler,
    type MainStep,
    type MultiStepFormHandler,
    type SharedState,
    PersonalInfo,
} from './types';

export class MultiStepFormHandlerImpl<T extends MainStep>
    implements MultiStepFormHandler<T>
{
    constructor(
        private formData: SharedState,
        private updateFormData: (val: Partial<SharedState>) => void,
        private readonly formHandlerFactory: Record<
            MainStep,
            FormHandler | undefined
        >
    ) {}

    getFormHandler(step: T) {
        return this.formHandlerFactory[step];
    }

    getFormData(step: T) {
        return this.formData[step];
    }

    setFormData(step: T, data: SharedState[keyof SharedState]) {
        this.updateFormData({ ...this.formData, [step]: data });
        console.log('personalInfoData: ', data);
    }

    canSubmit(step: T) {
        return !!this.getFormHandler(step)?.canSubmit;
    }
}

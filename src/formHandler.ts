import { FormHandler, MainStep, SharedState } from './types';
import { PersonalInfoFormHandler } from './ui/multi_step_form/personal_info/formHandler';

export class MultiStepFormHandler {
    constructor(
        private formData: SharedState,
        private updateFormData: (val: Partial<SharedState>) => void,
        private readonly formHandlerFactory: Record<
            MainStep,
            FormHandler | undefined
        >
    ) {}

    getFormHandler(step: MainStep) {
        return this.formHandlerFactory[step];
    }

    setFormData(step: MainStep, data: Partial<SharedState>) {
        // TODO: fix typing
        this.updateFormData({ ...this.formData, [step]: data });
        console.log('personalInfoData: ', data);
        this.getFormHandler(step)?.setFormData(data);
    }

    canSubmit(step: MainStep) {
        return !!this.getFormHandler(step)?.canSubmit;
    }
}

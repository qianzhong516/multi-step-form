import { FormHandler } from '../../../types';
import type {
    PersonalInfoFormData,
    PersonalInfoFormError,
} from './personal_info_form';

export class PersonalInfoFormHandler implements FormHandler {
    constructor(
        private _formData: PersonalInfoFormData,
        private _formError: PersonalInfoFormError
    ) {}

    get formData() {
        return this._formData;
    }

    get canSubmit(): boolean {
        return this.isEmailValid && this.isPhoneValid;
    }

    setFormData(data: PersonalInfoFormData) {
        this._formData = { ...this._formData, ...data };
    }

    setFormError(error: PersonalInfoFormError) {
        this._formError = { ...this._formError, ...error };
    }

    private get isEmailValid(): boolean {
        return (
            !this.isEmpty(this._formData.email) &&
            !!this._formData.email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        );
    }

    private get isPhoneValid() {
        return (
            !this.isEmpty(this._formData.phone) &&
            !!this._formData.phone.match(/^\+61[0-9]{9}$/)
        );
    }

    private isEmpty(val: string): boolean {
        return val.trim() === '';
    }
}

import { FormHandler, PersonalInfo } from '../../../types';

const defaultFormData = {
    name: '',
    email: '',
    phone: '',
};

export class PersonalInfoFormHandler implements FormHandler {
    private _formData = defaultFormData;

    constructor(formData: PersonalInfo | undefined) {
        this._formData = {
            ...this._formData,
            ...formData,
        };
    }

    get formData() {
        return this._formData;
    }

    get canSubmit(): boolean {
        return this.isEmailValid && this.isPhoneValid;
    }

    setFormData(data: PersonalInfo) {
        this._formData = { ...this._formData, ...data };
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

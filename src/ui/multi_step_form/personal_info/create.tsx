import React from 'react';
import { CreateStepArgs, CreateStepStructure } from '../../../types';
import {
    PersonalInfoForm,
    PersonalInfoFormData,
    PersonalInfoFormError,
} from './personal_info_form';
import { PersonalInfoFormHandler } from './formHandler';

export function createPersonalInfoStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        const formData = {
            name: '',
            email: '',
            phone: '',
        };
        const formError = {
            isNameError: false,
            isEmailError: false,
            isPhoneError: false,
        };

        const formHandler = new PersonalInfoFormHandler(formData, formError);

        const onChange = (
            data: PersonalInfoFormData,
            error: PersonalInfoFormError
        ) => {
            formHandler.setFormData(data);
            formHandler.setFormError(error);
        };

        return {
            step: 'personalInfo',
            formHandler,
            structure: {
                title: 'Personal Info',
                subtitle:
                    'Please provide your name, email address, and phone number',
                content: <PersonalInfoForm onChange={onChange} />,
                onNext: () => {
                    if (!formHandler.canSubmit) {
                        return;
                    }
                    navigationProvider.goNext({
                        sharedState: {
                            ...sharedState,
                            personalInfo: formHandler.formData,
                        },
                    });
                },
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

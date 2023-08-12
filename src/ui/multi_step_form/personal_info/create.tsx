import React from 'react';
import { CreateStepArgs, CreateStepStructure } from '../../../types';
import {
    PersonalInfoForm,
    PersonalInfoFormData,
    PersonalInfoFormError,
} from './personal_info_form';

export function createPersonalInfoStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        let formData = {
            name: '',
            email: '',
            phone: '',
        };

        let formError = {
            isNameError: false,
            isEmailError: false,
            isPhoneError: false,
        };

        const onChange = (
            data: PersonalInfoFormData,
            error: PersonalInfoFormError
        ) => {
            formData = { ...formData, ...data };
            formError = { ...formError, ...error };
        };

        return {
            step: 'personalInfo',
            structure: {
                title: 'Personal Info',
                subtitle:
                    'Please provide your name, email address, and phone number',
                content: <PersonalInfoForm onChange={onChange} />,
                onNext: () =>
                    navigationProvider.goNext({
                        sharedState: {
                            ...sharedState,
                            personalInfo: formData,
                        },
                    }),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

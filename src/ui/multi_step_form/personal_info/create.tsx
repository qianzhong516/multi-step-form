import React from 'react';
import { CreateStepArgs, CreateStepStructure } from '../../../types';
import {
    PersonalInfoForm,
    PersonalInfoFormData,
    PersonalInfoFormError,
} from './personal_info_form';
import { PersonalInfoFormHandler } from './formHandler';

const STEP = 'personalInfo';

export function createPersonalInfoStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider, formHandler }) => {
        const onChange = (data: PersonalInfoFormData) => {
            formHandler?.setFormData(STEP, data);
        };

        return {
            step: STEP,
            formHandler,
            structure: {
                title: 'Personal Info',
                subtitle:
                    'Please provide your name, email address, and phone number',
                content: (
                    <PersonalInfoForm
                        formData={formHandler.getFormHandler(STEP).formData}
                        onChange={onChange}
                    />
                ),
                onNext: () => {
                    navigationProvider.goNext({
                        sharedState: {
                            ...sharedState,
                            personalInfo:
                                formHandler.getFormHandler(STEP).formData,
                        },
                    });
                },
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

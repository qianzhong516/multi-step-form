import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    PersonalInfo,
    Step,
} from '../../../types';
import { PersonalInfoForm } from './personal_info_form';

export function createPersonalInfoStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure<Step.PERSONAL_INFO> {
    return ({ navigationProvider, formHandler }) => {
        const onChange = (data: PersonalInfo) => {
            formHandler?.setFormData(Step.PERSONAL_INFO, data);
        };

        return {
            step: Step.PERSONAL_INFO,
            formHandler,
            structure: {
                title: 'Personal Info',
                subtitle:
                    'Please provide your name, email address, and phone number',
                content: (
                    <PersonalInfoForm
                        personalInfo={formHandler?.getFormData(
                            Step.PERSONAL_INFO
                        )}
                        onChange={onChange}
                    />
                ),
                onNext: () => {
                    navigationProvider.goNext({
                        sharedState: {
                            ...sharedState,
                            personalInfo: formHandler?.getFormData(
                                Step.PERSONAL_INFO
                            ),
                        },
                    });
                },
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

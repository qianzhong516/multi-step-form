import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    MainStep,
    PersonalInfo,
    Step,
} from '../../../types';
import { PersonalInfoForm } from './personal_info_form';

export function createPersonalInfoStep({
    flowStore,
    options: {},
}: CreateStepArgs<Step, MainStep>): CreateStepStructure<
    Step,
    Step.PERSONAL_INFO
> {
    return ({ navigationProvider, formHandler }) => {
        const onChange = (data: PersonalInfo) => {
            formHandler.setCurrentFormData(Step.PERSONAL_INFO, data);
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
                        personalInfo={formHandler.getCurrentFormData(
                            Step.PERSONAL_INFO
                        )}
                        onChange={onChange}
                    />
                ),
                onNext: () => navigationProvider.goNext(),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

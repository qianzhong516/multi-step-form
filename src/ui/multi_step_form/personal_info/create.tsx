import React from 'react';
import {
    CreateStepArgs,
    CreateStepStructure,
    MainStep,
    PersonalInfo,
    SharedState,
    Step,
} from '../../../types';
import { PersonalInfoForm } from './personal_info_form';

export function createPersonalInfoStep({
    flowStore,
    options: {},
}: CreateStepArgs<Step, MainStep, SharedState>): CreateStepStructure<
    Step,
    Step.PERSONAL_INFO,
    SharedState
> {
    return ({ navigationProvider, formHandler }) => {
        const onChange = (data: PersonalInfo) => {
            formHandler.setFormData(Step.PERSONAL_INFO, data);
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
                        personalInfo={formHandler.getFormData(
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

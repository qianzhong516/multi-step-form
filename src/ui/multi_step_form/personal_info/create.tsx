import React from 'react';
import { CreateStepArgs, CreateStepStructure } from '../../../types';
import { PersonalInfoForm } from './personal_info_form';

export function createPersonalInfoStep({
    flowStore,
    options: { sharedState },
}: CreateStepArgs): CreateStepStructure {
    return ({ navigationProvider }) => {
        console.log('createPersonalInfoStep: ', sharedState);

        return {
            step: 'personalInfo',
            structure: {
                title: 'Personal Info',
                subtitle:
                    'Please provide your name, email address, and phone number',
                content: <PersonalInfoForm />,
                onNext: () =>
                    navigationProvider.goNext({
                        sharedState: {
                            personalInfo: {
                                email: 'zhongqian516@gmail.com',
                            },
                        },
                    }),
                onClose: () => navigationProvider.close(),
            },
        };
    };
}

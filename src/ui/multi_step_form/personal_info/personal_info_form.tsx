import React from 'react';
import { TextInput } from '../../base/text_input/text_input';
import styles from './personal_info_form.css';
import { PersonalInfo } from '../../../types';

type PersonalInfoFormProps = {
    personalInfo: PersonalInfo | undefined;
    onChange(formData: PersonalInfo): void;
};

export const PersonalInfoForm = ({
    personalInfo = {
        name: '',
        email: '',
        phone: '',
    },
    onChange,
}: PersonalInfoFormProps) => {
    const onNameChange = (name: string) => {
        onChange({ ...personalInfo, name });
    };
    const onEmailChange = (email: string) => {
        onChange({ ...personalInfo, email });
    };
    const onPhoneChange = (phone: string) => {
        onChange({ ...personalInfo, phone });
    };

    return (
        <div>
            <TextInput
                title='Name'
                placeholder='e.g. Stephen King'
                required={true}
                value={personalInfo.name}
                onChange={onNameChange}
                className={styles.input}
            />
            <TextInput
                title='Email Address'
                placeholder='e.g. stephenking@lorem.com'
                value={personalInfo.email}
                onChange={onEmailChange}
                validate={(val) => {
                    if (
                        !val.match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        )
                    ) {
                        return 'Invalid email address';
                    }
                }}
                required={true}
                className={styles.input}
            />
            <TextInput
                title='Phone Number'
                placeholder='e.g. +61410000000'
                value={personalInfo.phone}
                onChange={onPhoneChange}
                validate={(val) => {
                    if (!val.match(/^\+61[0-9]{9}$/)) {
                        return 'Invalid phone number. Accepted format: +61410000000.';
                    }
                }}
                required={true}
                className={styles.input}
            />
        </div>
    );
};

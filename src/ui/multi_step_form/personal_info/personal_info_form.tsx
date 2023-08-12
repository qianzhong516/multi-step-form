import React from 'react';
import { TextInput } from '../../base/text_input/text_input';
import styles from './personal_info_form.css';

export type PersonalInfoFormData = {
    name: string;
    email: string;
    phone: string;
};

export type PersonalInfoFormError = {
    isNameError: boolean;
    isEmailError: boolean;
    isPhoneError: boolean;
};

type PersonalInfoFormProps = {
    onChange(
        formData: PersonalInfoFormData,
        formError: PersonalInfoFormError
    ): void;
};

export const PersonalInfoForm = ({ onChange }: PersonalInfoFormProps) => {
    const [formData, setFormData] = React.useState<PersonalInfoFormData>({
        name: '',
        email: '',
        phone: '',
    });
    const [formError, setFormError] = React.useState<PersonalInfoFormError>({
        isNameError: false,
        isEmailError: false,
        isPhoneError: false,
    });

    const onNameChange = (name: string, isNameError: boolean) => {
        setFormData({ ...formData, name });
        setFormError({ ...formError, isNameError });
        onChange({ ...formData, name }, { ...formError, isNameError });
    };
    const onEmailChange = (email: string, isEmailError: boolean) => {
        setFormData({ ...formData, email });
        setFormError({ ...formError, isEmailError });
        onChange({ ...formData, email }, { ...formError, isEmailError });
    };
    const onPhoneChange = (phone: string, isPhoneError: boolean) => {
        setFormData({ ...formData, phone });
        setFormError({ ...formError, isPhoneError });
        onChange({ ...formData, phone }, { ...formError, isPhoneError });
    };

    return (
        <div>
            <TextInput
                title='Name'
                placeholder='e.g. Stephen King'
                required={true}
                value={formData.name}
                onChange={onNameChange}
                className={styles.input}
            />
            <TextInput
                title='Email Address'
                placeholder='e.g. stephenking@lorem.com'
                value={formData.email}
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
                value={formData.phone}
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

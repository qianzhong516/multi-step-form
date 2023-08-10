import React from 'react';
import { TextInput } from '../../base/text_input/text_input';
import styles from './personal_info_form.css';

export const PersonalInfoForm = () => {
    return (
        <div>
            <TextInput
                title='Name'
                placeholder='e.g. Stephen King'
                required={true}
                className={styles.input}
            />
            <TextInput
                title='Email Address'
                placeholder='e.g. stephenking@lorem.com'
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

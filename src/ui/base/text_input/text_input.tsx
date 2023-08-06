import * as React from 'react';
import { Text } from '../text/text';
import classnames from 'classnames';
import styles from './text_input.css';

export type TextInputProps = {
    title?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
};

export const TextInput = ({
    title,
    placeholder,
    className,
    required = false,
}: TextInputProps) => {
    const [value, setValue] = React.useState('');

    return (
        <div className={className}>
            <div className={styles.header}>
                {!isEmpty(title) && (
                    <Text.Small variant='primary'>{title}</Text.Small>
                )}
                {required && isEmpty(value) && (
                    <ErrorMessage message='This field is required' />
                )}
            </div>
            <input
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

const ErrorMessage = ({ message }: { message: string }) => (
    <Text.Small variant='error' styling='bold'>
        {message}
    </Text.Small>
);

const isEmpty = (value: string | undefined) => value?.trim() === '';

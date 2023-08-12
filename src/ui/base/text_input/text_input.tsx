import * as React from 'react';
import { Text } from '../text/text';
import styles from './text_input.css';

export type TextInputProps = {
    title?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    value: string;
    onChange(value: string, isError: boolean): void;
    validate?(value: string): string | undefined;
};

export const TextInput = ({
    title,
    placeholder,
    className,
    required = false,
    value,
    onChange,
    validate,
}: TextInputProps) => {
    const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

    const getErrorMessage = React.useCallback(
        (value: string) => {
            if (required && isEmpty(value)) {
                const requiredFieldErrorMessage = 'This field cannot be empty';
                return requiredFieldErrorMessage;
            }
            return validate?.(value);
        },
        [value]
    );

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = getErrorMessage(value);
        if (error) {
            setErrorMessage(error);
        } else {
            setErrorMessage(null);
        }
        onChange(value, !!error);
    };

    return (
        <div className={className}>
            <div className={styles.header}>
                {!isEmpty(title) && (
                    <Text.Small variant='primary'>{title}</Text.Small>
                )}
                {errorMessage && <ErrorMessage message={errorMessage} />}
            </div>
            <input
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
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

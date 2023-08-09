import * as React from 'react';
import { Text } from '../text/text';
import styles from './text_input.css';

export type TextInputProps = {
    title?: string; // TODO: type it to none empty string
    placeholder?: string;
    className?: string;
    required?: boolean;
    validate?(value: string): string | undefined;
};

export const TextInput = ({
    title,
    placeholder,
    className,
    required = false,
    validate,
}: TextInputProps) => {
    const [value, setValue] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

    const getErrorMessage = React.useCallback(
        (value: string) => {
            if (required && isEmpty(value)) {
                const requiredFieldErrorMessage = 'This field is required';
                return requiredFieldErrorMessage;
            }
            return validate?.(value);
        },
        [value]
    );

    // TODO: add first touched logic
    React.useEffect(() => {
        const error = getErrorMessage(value);
        if (error) {
            setErrorMessage(error);
        } else {
            setErrorMessage(null);
        }
    }, [value]);

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

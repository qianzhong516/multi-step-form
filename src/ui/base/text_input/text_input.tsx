import * as React from 'react';
import { Text } from '../text/text';
import classnames from 'classnames';
import styles from './text_input.css';

export type TextInputProps = {
    title?: string;
    placeholder?: string;
    className?: string;
    stretch?: boolean;
};

export const TextInput = ({
    title,
    placeholder,
    className,
    stretch = false,
}: TextInputProps) => {
    const [value, setValue] = React.useState('');

    return (
        <div className={className}>
            {title && (
                <div className={styles.title}>
                    <Text.Small variant='primary'>{title}</Text.Small>
                </div>
            )}
            <input
                className={classnames(styles.input, {
                    [styles.fullWidth]: stretch,
                })}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

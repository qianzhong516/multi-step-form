import React from 'react';
import styles from './button.css';
import { Text } from '../text/text';
import classnames from 'classnames';

type ButtonProps = {
    disabled?: boolean;
    variant: 'primary' | 'secondary';
    title: string;
    onClick?(): void;
};

export const Button = ({ disabled, variant, title, onClick }: ButtonProps) => (
    <button
        className={classnames(
            styles.button,
            { [styles.primary]: variant === 'primary' },
            { [styles.secondary]: variant === 'secondary' },
            { [styles.disabled]: disabled }
        )}
        onClick={onClick}
        disabled={disabled}>
        <Text.Medium variant='tertiary'>{title}</Text.Medium>
    </button>
);

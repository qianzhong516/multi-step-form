import React, { Children } from 'react';
import styles from './button.css';
import { Text } from '../text/text';
import classnames from 'classnames';

type ButtonProps = {
    disabled?: boolean;
    variant: 'primary' | 'secondary';
    title?: string;
    onClick?(): void;
    className?: string;
    children?: React.ReactNode;
};

export const Button = ({
    disabled,
    variant,
    title,
    onClick,
    className,
    children,
}: ButtonProps) => (
    <button
        className={classnames(
            styles.button,
            { [styles.primary]: variant === 'primary' },
            { [styles.secondary]: variant === 'secondary' },
            { [styles.disabled]: disabled },
            className
        )}
        onClick={onClick}
        disabled={disabled}>
        {title && <Text.Medium variant='tertiary'>{title}</Text.Medium>}
        {children}
    </button>
);

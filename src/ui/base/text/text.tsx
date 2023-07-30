import classnames from 'classnames';
import styles from './text.css';
import React from 'react';

type TextProps = {
    variant: 'primary' | 'secondary' | 'tertiary';
    size: 'large' | 'medium' | 'small';
    styling?: 'bold' | 'regular';
    /* Style override is not recommended for base components. Use it as the last resort. */
    className?: string;
};

export const Text = ({
    variant,
    size,
    styling = 'regular',
    className,
}: TextProps) => {
    return (
        <div
            className={classnames(
                { [styles.primary]: variant === 'primary' },
                { [styles.secondary]: variant === 'secondary' },
                { [styles.tertiary]: variant === 'tertiary' },
                { [styles.small]: size === 'small' },
                { [styles.medium]: size === 'medium' },
                { [styles.large]: size === 'large' },
                { [styles.regular]: styling === 'regular' },
                { [styles.bold]: styling === 'bold' },
                className
            )}>
            Text
        </div>
    );
};

export const Title = () => <div></div>;

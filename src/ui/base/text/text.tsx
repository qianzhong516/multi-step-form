import classnames from 'classnames';
import styles from './text.css';
import React from 'react';

type TextProps = {
    type: 'text' | 'title';
    variant: 'primary' | 'secondary' | 'tertiary';
    size?: 'large' | 'medium' | 'small';
    styling?: 'bold' | 'regular';
    /* Style override is not recommended for base components. Use it as the last resort. */
    className?: string;
    children: React.ReactNode;
};

/**
 * Do not export for external use.
 */
export const InternalText = ({
    type,
    variant,
    size = 'medium',
    styling = 'regular',
    className,
    children,
}: TextProps) => {
    let classNames = getClassNames({
        type,
        variant,
        size,
        styling,
        className,
    });

    switch (size) {
        case 'large':
            return <h1 className={classNames}>{children}</h1>;
        case 'medium':
            return <h2 className={classNames}>{children}</h2>;
        case 'small':
            return <h3 className={classNames}>{children}</h3>;
        default:
            break;
    }

    return <div className={classNames}>{children}</div>;
};

export const Text = getTypography('text');

export const Title = getTypography('title');

function getTypography(type: Pick<TextProps, 'type'>['type']) {
    return {
        Large: (props: Omit<TextProps, 'type' | 'size'>) => (
            <InternalText type={type} size='large' {...props} />
        ),
        Medium: (props: Omit<TextProps, 'type' | 'size'>) => (
            <InternalText type={type} size='medium' {...props} />
        ),
        Small: (props: Omit<TextProps, 'type' | 'size'>) => (
            <InternalText type={type} size='small' {...props} />
        ),
    };
}

function getClassNames({
    type,
    variant,
    size,
    styling,
    className,
}: Omit<TextProps, 'children'>) {
    return classnames(
        styles[type],
        { [styles.primary]: variant === 'primary' },
        { [styles.secondary]: variant === 'secondary' },
        { [styles.tertiary]: variant === 'tertiary' },
        { [styles.small]: type === 'text' && size === 'small' },
        { [styles.medium]: type === 'text' && size === 'medium' },
        { [styles.large]: type === 'text' && size === 'large' },
        { [styles.regular]: styling === 'regular' },
        { [styles.bold]: styling === 'bold' },
        className
    );
}

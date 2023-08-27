import React, { FormEventHandler, ReactEventHandler } from 'react';
import styles from './link.css';
import { Text } from '../text/text';
import classnames from 'classnames';

type LinkProps = {
    variant: 'primary' | 'secondary';
    onClick?(): void;
    className?: string;
    children?: React.ReactNode;
};

export const Link = ({ variant, onClick, className, children }: LinkProps) => {
    const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick?.();
    };

    return (
        <a
            className={classnames(
                styles.link,
                { [styles.primary]: variant === 'primary' },
                { [styles.secondary]: variant === 'secondary' },
                className
            )}
            onClick={onClickHandler}
            href='#'>
            <Text.Small variant={variant}>{children}</Text.Small>
        </a>
    );
};

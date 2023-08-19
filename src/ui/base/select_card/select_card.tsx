import styles from './select_card.css';
import { Text } from '../text/text';
import classnames from 'classnames';
import React from 'react';

export type SelectCardProps = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    isActive?: boolean;
    description?: string;
    onClick?(): void;
    className?: string;
};

// TODO: to address accessbility
export const SelectCard = ({
    icon,
    title,
    subtitle,
    isActive = false,
    description,
    onClick,
    className,
}: SelectCardProps) => (
    <button
        className={classnames(className, styles.card, {
            [styles.active]: isActive,
        })}
        onClick={onClick}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>
            <Text.Medium variant='primary' styling='bold'>
                {title}
            </Text.Medium>
        </div>
        <Text.Small variant='secondary'>{subtitle}</Text.Small>
        {description && (
            <div className={styles.description}>
                <Text.ExtraSmall variant='primary'>
                    {description}
                </Text.ExtraSmall>
            </div>
        )}
    </button>
);

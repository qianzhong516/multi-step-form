import React from 'react';
import classnames from 'classnames';
import { Text } from '../text/text';
import styles from './multi_select_card.css';
import { Checkbox } from '../checkbox/checkbox';

type MultiSelectCardProps = {
    title: string;
    subtitle: string;
    displayValue: string;
    isSelected: boolean;
    onChange(): void;
};

export const MultiSelectCard = ({
    title,
    subtitle,
    displayValue,
    isSelected,
    onChange,
}: MultiSelectCardProps) => (
    <div
        className={classnames(styles.container, {
            [styles.active]: isSelected,
        })}>
        <div className={styles.checkbox}>
            <Checkbox isSelected={isSelected} onChange={onChange} />
        </div>
        <div className={styles.description}>
            <Text.Medium variant='primary' styling='bold'>
                {title}
            </Text.Medium>
            <Text.Small variant='secondary'>{subtitle}</Text.Small>
        </div>
        <div>
            <Text.Small variant='primary'>{displayValue}</Text.Small>
        </div>
    </div>
);

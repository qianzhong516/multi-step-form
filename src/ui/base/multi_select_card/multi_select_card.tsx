import React from 'react';
import classnames from 'classnames';
import { Text } from '../text/text';
import styles from './multi_select_card.css';
import { Checkbox } from '../checkbox/checkbox';

export type MultiSelectCardProps = {
    title: string;
    subtitle: string;
    displayValue: string;
    isSelected: boolean;
    onChange(isSelected: boolean): void;
};

export const MultiSelectCard = ({
    title,
    subtitle,
    displayValue,
    isSelected,
    onChange,
}: MultiSelectCardProps) => {
    const [isActive, setIsActive] = React.useState(isSelected);

    const handleOnChange = () => {
        onChange(!isActive);
        setIsActive((isActive) => !isActive);
    };

    return (
        <div
            className={classnames(styles.container, {
                [styles.active]: isActive,
            })}>
            <div className={styles.checkbox}>
                <Checkbox isSelected={isActive} onChange={handleOnChange} />
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
};

import React from 'react';
import {
    advancedIcon,
    arcadeIcon,
    proIcon,
} from '../../../ui/base/icon_image/icon_image';
import { SelectCardProps } from '../../base/select_card/select_card';
import { capitalize, isObjectStructuallyEqual } from '../../utils/utils';
import { SelectCard } from '../../base/select_card/select_card';
import { PlanDetails } from '../../../types';
import { ToggleButton } from '../../base/toggle_button/toggle_button';
import { Icon } from '../../base/icon/icon';
import styles from './select_plan.css';

const monthlyPlanDetails = {
    type: 'monthly',
    options: [
        { name: 'arcade', price: 9 },
        { name: 'advanced', price: 12 },
        { name: 'pro', price: 15 },
    ],
} as const;

const yearlyPlanDetails = {
    type: 'yearly',
    options: [
        { name: 'arcade', price: 90, description: '2 months free' },
        { name: 'advanced', price: 120, description: '2 months free' },
        { name: 'pro', price: 150, description: '2 months free' },
    ],
} as const;

const iconMap = {
    arcade: arcadeIcon,
    advanced: advancedIcon,
    pro: proIcon,
};

export const SelectPlanForm = ({
    planDetails,
    onChange,
}: {
    // TODO: remove optional modifier after all steps are added
    planDetails?: PlanDetails;
    onChange(value: PlanDetails): void;
}) => {
    const recurringVariant = planDetails!.type;
    const cardOptions = createSelectCardOptions(recurringVariant);

    const onToggle = (recurringVariant: 'monthly' | 'yearly') => {
        const cardOptions = createSelectCardOptions(recurringVariant);
        onChange(cardOptions[0].value);
    };

    const PlanSelect = () => {
        return (
            <div className={styles.planSelect}>
                {cardOptions.map(({ value, ...cardProps }, i) => {
                    const onClick = React.useCallback(() => {
                        onChange(value);
                    }, []);

                    return (
                        <SelectCard
                            key={cardProps.title}
                            isActive={
                                planDetails &&
                                isObjectStructuallyEqual(planDetails, value)
                            }
                            onClick={onClick}
                            {...cardProps}
                        />
                    );
                })}
            </div>
        );
    };

    const toggleButton = (
        <div className={styles.toggleContainer}>
            <ToggleButton
                defaultValue={recurringVariant}
                value={{
                    on: 'yearly',
                    off: 'monthly',
                }}
                onToggle={onToggle}
            />
        </div>
    );

    return (
        <div>
            <PlanSelect />
            {toggleButton}
        </div>
    );
};

function createSelectCardOptions(
    recurringVariant: 'monthly' | 'yearly'
): (SelectCardProps & { value: PlanDetails })[] {
    switch (recurringVariant) {
        case 'monthly':
            return monthlyPlanDetails.options.map(({ name, price }) => ({
                icon: <Icon img={iconMap[name]} size='medium' />,
                title: capitalize(name),
                subtitle: `${price}/mo`,
                value: {
                    type: 'monthly',
                    planType: name,
                    price,
                },
            }));
        case 'yearly':
            return yearlyPlanDetails.options.map(
                ({ name, price, description }) => ({
                    icon: <Icon img={iconMap[name]} size='medium' />,
                    title: capitalize(name),
                    subtitle: `${price}/mo`,
                    description,
                    value: {
                        type: 'yearly',
                        planType: name,
                        price,
                    },
                })
            );
        default:
            throw new Error('Invalid plan type.');
    }
}

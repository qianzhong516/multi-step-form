import React from 'react';
import {
    advancedIcon,
    arcadeIcon,
    proIcon,
} from '../../../ui/base/icon_image/icon_image';
import { SelectCardProps } from '../../base/select_card/select_card';
import { capitalize, isObjectStructuallyEqual } from '../../utils/utils';
import { SelectCard } from '../../base/select_card/select_card';
import {
    PlanDetails,
    PlanSelectOption,
    RecurringVariant,
} from '../../../types';
import { ToggleButton } from '../../base/toggle_button/toggle_button';
import { Icon } from '../../base/icon/icon';
import styles from './select_plan.css';

const iconMap = {
    arcade: arcadeIcon,
    advanced: advancedIcon,
    pro: proIcon,
};

export const SelectPlanForm = ({
    planDetails,
    onChange,
    getPlanSelectOptions,
}: {
    // TODO: remove optional modifier after all steps are added
    planDetails?: PlanDetails;
    onChange(value: PlanDetails): void;
    getPlanSelectOptions(type: RecurringVariant): PlanSelectOption;
}) => {
    const recurringVariant = planDetails!.type;
    const cardOptions = createSelectCardOptions(
        getPlanSelectOptions(recurringVariant)
    );

    const onToggle = (recurringVariant: 'monthly' | 'yearly') => {
        const cardOptions = createSelectCardOptions(
            getPlanSelectOptions(recurringVariant)
        );
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
    planSelectOption: PlanSelectOption
): (SelectCardProps & { value: PlanDetails })[] {
    switch (planSelectOption.type) {
        case 'monthly':
            return planSelectOption.options.map(({ name, price }) => ({
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
            return planSelectOption.options.map(({ name, price }) => ({
                icon: <Icon img={iconMap[name]} size='medium' />,
                title: capitalize(name),
                subtitle: `${price}/yr`,
                description: '2 months free',
                value: {
                    type: 'yearly',
                    planType: name,
                    price,
                },
            }));
        default:
            throw new Error('Invalid plan type.');
    }
}

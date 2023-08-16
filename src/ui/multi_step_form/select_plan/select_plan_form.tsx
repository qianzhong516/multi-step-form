import React from 'react';
import {
    advancedIcon,
    arcadeIcon,
    proIcon,
} from '../../../ui/base/icon_image/icon_image';
import { SelectCardProps } from '../../base/select_card/select_card';
import { capitalize } from '../../utils/utils';
import { SelectCard } from '../../base/select_card/select_card';
import { PlanDetails } from '../../../types';
import { ToggleButton } from '../../base/toggle_button/toggle_button';

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
    planType = 'monthly',
    onChange,
}: {
    planType?: 'monthly' | 'yearly';
    onChange(value: PlanDetails): void;
}) => {
    const [type, setType] = React.useState(planType);

    const cardOptions = createSelectCardOptions(type);

    const onToggle = (planType: 'monthly' | 'yearly') => {
        setType(planType);
    };

    const planSelectComponent = cardOptions.map(
        ({ value, ...cardProps }, i) => {
            const [index, setIndex] = React.useState(0);
            const onClick = React.useCallback(() => setIndex(i), []);

            React.useEffect(() => {
                onChange(value);
            }, [index]);

            return (
                <SelectCard
                    key={cardProps.title}
                    isActive={index === i}
                    onClick={onClick}
                    {...cardProps}
                />
            );
        }
    );

    return (
        <div>
            {planSelectComponent}
            <ToggleButton
                value={{
                    on: 'monthly',
                    off: 'yearly',
                }}
                onToggle={onToggle}
            />
        </div>
    );
};

function createSelectCardOptions(
    planType: 'monthly' | 'yearly'
): (SelectCardProps & { value: PlanDetails })[] {
    switch (planType) {
        case 'monthly':
            return monthlyPlanDetails.options.map(({ name, price }) => ({
                icon: iconMap[name],
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
                    icon: iconMap[name],
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

import React from 'react';
import { AddOnType, AddonDetails, RecurringVariant } from '../../../types';
import {
    MultiSelectCard,
    type MultiSelectCardProps,
} from '../../base/multi_select_card/multi_select_card';
import styles from './plan_addons_form.css';

const monthlyAddonList = {
    type: 'monthly',
    options: [
        {
            name: 'Online service',
            description: 'Access to multiplayer games',
            price: 9,
        },
        {
            name: 'Larger storage',
            description: 'Extra 1TB of cloud save',
            price: 12,
        },
        {
            name: 'Customizable profile',
            description: 'Custom theme on your profile',
            price: 15,
        },
    ],
} as const;

const yearlyAddonList = {
    type: 'yearly',
    options: [
        {
            name: 'Online service',
            description: 'Access to multiplayer games',
            price: 10,
        },
        {
            name: 'Larger storage',
            description: 'Extra 1TB of cloud save',
            price: 20,
        },
        {
            name: 'Customizable profile',
            description: 'Custom theme on your profile',
            price: 20,
        },
    ],
} as const;

export const PlanAddonsForm = ({
    recurringType,
    addons,
    onChange,
}: {
    recurringType: RecurringVariant;
    addons: AddonDetails[] | undefined;
    onChange(value: AddonDetails): void;
}) => {
    const addonOptions = createAddonOptions(recurringType);
    const handleOnChange = (isSelected: boolean, value: AddonDetails) => {
        if (isSelected) {
            onChange(value);
        }
    };

    return (
        <div className={styles.container}>
            {addonOptions.map((option) => (
                <MultiSelectCard
                    {...option}
                    isSelected={
                        !!addons?.some(
                            (addon) =>
                                option.value.price === addon.price &&
                                option.value.type === addon.type
                        )
                    }
                    onChange={(isSelected) =>
                        handleOnChange(isSelected, option.value)
                    }
                />
            ))}
        </div>
    );
};

function createAddonOptions(type: RecurringVariant): (Omit<
    MultiSelectCardProps,
    'onChange' | 'isSelected'
> & {
    value: AddonDetails;
})[] {
    switch (type) {
        case 'monthly':
            return monthlyAddonList.options.map((option) => ({
                title: option.name,
                subtitle: option.description,
                displayValue: `+$${option.price}/mo`,
                value: {
                    type: mapNameType(option.name),
                    price: option.price,
                },
            }));
        case 'yearly':
            return yearlyAddonList.options.map((option) => ({
                title: option.name,
                subtitle: option.description,
                displayValue: `+$${option.price}/yr`,
                value: {
                    type: mapNameType(option.name),
                    price: option.price,
                },
            }));
        default:
            throw new Error('Invalid plan type.');
    }
}

function mapNameType(name: string): AddOnType {
    switch (name) {
        case 'Online service':
            return 'onlineService';
        case 'Larger storage':
            return 'largerStorage';
        case 'Customizable profile':
            return 'customizableProfile';
        default:
            throw new Error('Invalid addon name.');
    }
}

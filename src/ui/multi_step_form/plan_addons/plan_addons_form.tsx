import React from 'react';
import {
    AddOnType,
    AddonDetails,
    AddonOption,
    RecurringVariant,
} from '../../../types';
import {
    MultiSelectCard,
    type MultiSelectCardProps,
} from '../../base/multi_select_card/multi_select_card';
import styles from './plan_addons_form.css';

export const PlanAddonsForm = ({
    addons,
    onChange,
    getAddonOption,
}: {
    // TODO: `AddonDetails` needs the recurringVariant to update addOn items accordingly
    // if there is a change on the recurringVariant from last step
    addons: AddonDetails[];
    onChange(isSelected: boolean, value: AddonDetails): void;
    getAddonOption(): AddonOption;
}) => {
    const addonOptions = createAddonOptions(getAddonOption());
    const handleOnChange = (isSelected: boolean, value: AddonDetails) => {
        onChange(isSelected, value);
    };

    return (
        <div className={styles.container}>
            {addonOptions.map((option) => (
                <MultiSelectCard
                    key={option.title}
                    {...option}
                    isSelected={addons.some(
                        (addon) =>
                            option.value.price === addon.price &&
                            option.value.type === addon.type
                    )}
                    onChange={(isSelected) =>
                        handleOnChange(isSelected, option.value)
                    }
                />
            ))}
        </div>
    );
};

function createAddonOptions(addonOption: AddonOption): (Omit<
    MultiSelectCardProps,
    'onChange' | 'isSelected'
> & {
    value: AddonDetails;
})[] {
    switch (addonOption.type) {
        case 'monthly':
            return addonOption.options.map((option) => ({
                title: option.name,
                subtitle: option.description,
                displayValue: `+$${option.price}/mo`,
                value: {
                    type: mapNameType(option.name),
                    price: option.price,
                },
            }));
        case 'yearly':
            return addonOption.options.map((option) => ({
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

export function mapNameType(name: string): AddOnType {
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

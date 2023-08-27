import React from 'react';
import styles from './summary.css';
import { Text } from '../../base/text/text';
import {
    AddOnType,
    AddonDetails,
    PlanDetails,
    RecurringVariant,
} from '../../../types';
import { capitalize } from '../../utils/utils';
import { Button } from '../../base/button/button';

export const Summary = ({
    planDetails,
    addons,
    onChangePlan,
}: {
    planDetails: PlanDetails;
    addons: AddonDetails[];
    onChangePlan: () => void;
}) => {
    const totalPrice = getTotalPrice(planDetails, addons);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.plan}>
                    <div className={styles.planType}>
                        <Text.Medium variant='primary' styling='bold'>
                            {capitalize(planDetails.planType)}
                            {` (${capitalize(planDetails.type)})`}
                        </Text.Medium>
                        {/* TODO: Make a link component */}
                        <Button
                            variant='secondary'
                            className={styles.changeBtn}
                            onClick={onChangePlan}>
                            <Text.Small variant='secondary'>Change</Text.Small>
                        </Button>
                    </div>
                    <Text.Medium variant='primary' styling='bold'>
                        {labelPrice(planDetails.type, planDetails.price)}
                    </Text.Medium>
                </div>
                {/* add separator here */}
                <div className={styles.addonContainer}>
                    {addons.map((addon) => (
                        <AddonRow
                            key={addon.type}
                            addonDetails={addon}
                            recurringType={planDetails.type}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.total}>
                <Text.Medium variant='secondary'>Total (per year)</Text.Medium>
                <Text.Large variant='primary' styling='bold'>
                    {labelPrice(planDetails.type, totalPrice)}
                </Text.Large>
            </div>
        </div>
    );
};

const AddonRow = ({
    addonDetails,
    recurringType,
}: {
    addonDetails: AddonDetails;
    recurringType: RecurringVariant;
}) => (
    <div className={styles.addonRow}>
        <Text.Medium variant='secondary'>
            {mapAddonName(addonDetails.type)}
        </Text.Medium>
        <Text.Medium variant='primary'>{`+${labelPrice(
            recurringType,
            addonDetails.price
        )}`}</Text.Medium>
    </div>
);

function getTotalPrice(planDetails: PlanDetails, addons: AddonDetails[]) {
    return addons.reduce((prev, curr) => prev + curr.price, planDetails.price);
}

function mapAddonName(type: AddOnType) {
    switch (type) {
        case 'onlineService':
            return 'Online Service';
        case 'largerStorage':
            return 'Larger Storage';
        case 'customizableProfile':
            return 'Customizable Profile';
        default:
            throw new Error('Invalid addon type.');
    }
}

function labelPrice(type: RecurringVariant, price: number) {
    return `$${price}${getPricingUnit(type)}`;
}

function getPricingUnit(type: RecurringVariant) {
    return type === 'monthly' ? '/mo' : '/yr';
}

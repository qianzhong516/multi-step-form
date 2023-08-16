import React from 'react';
import {
    advancedIcon,
    arcadeIcon,
    proIcon,
} from '../../../ui/base/icon_image/icon_image';
import { SelectCardProps } from '../../base/select_card/select_card';

const monthlyPlanDetails = {
    type: 'monthly',
    options: [
        { name: 'arcade', price: 9 },
        { name: 'advanced', price: 12 },
        { name: 'pro', price: 15 },
    ],
};

const yearlyPlanDetails = {
    type: 'yearly',
    options: [
        { name: 'arcade', price: 90 },
        { name: 'advanced', price: 120 },
        { name: 'pro', price: 150 },
    ],
};

const iconMap = {
    arcade: arcadeIcon,
    advanced: advancedIcon,
    pro: proIcon,
};

function createSelectCardOptions(
    planType: 'monthly' | 'yearly'
): SelectCardProps {
    return {
        title: '',
        subTitle: '',
        icon: null,
        isActive: false,
    };
}

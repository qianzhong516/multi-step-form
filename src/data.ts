import { AddonOption, PlanSelectOption } from './types';

export const monthlyPlanDetails: PlanSelectOption = {
    type: 'monthly',
    options: [
        { name: 'arcade', price: 9 },
        { name: 'advanced', price: 12 },
        { name: 'pro', price: 15 },
    ],
};

export const yearlyPlanDetails: PlanSelectOption = {
    type: 'yearly',
    options: [
        { name: 'arcade', price: 90 },
        { name: 'advanced', price: 120 },
        { name: 'pro', price: 150 },
    ],
};

export const monthlyAddonList: AddonOption = {
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
};

export const yearlyAddonList: AddonOption = {
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
};

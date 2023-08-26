import {
    AddonDetails,
    AddonOption,
    PlanSelectOption,
    RecurringVariant,
    SharedState,
    SharedStateController,
    Step,
} from './types';
import { mapNameType } from './ui/multi_step_form/plan_addons/plan_addons_form';

// for cross-communication between different steps
export class SharedStateControllerImpl implements SharedStateController {
    constructor(
        private readonly formData: SharedState,
        private updateFormData: (formData: Partial<SharedState>) => void,
        private planSelectOptions: PlanSelectOption[],
        private addonOptions: AddonOption[],
        private setPlanSelectOptions: (options: PlanSelectOption[]) => void,
        private setAddonOptions: (options: AddonOption[]) => void
    ) {}

    async load() {
        const [addonOptions, planSelectOptions] = await Promise.all([
            this.fetchAddonOptions(),
            this.fetchPlanSelectOptions(),
        ]);
        this.setPlanSelectOptions(planSelectOptions);
        this.setAddonOptions(addonOptions);
    }

    private async fetchAddonOptions(): Promise<AddonOption[]> {
        return new Promise((res, _) => {
            setTimeout(() => {
                res([monthlyAddonList, yearlyAddonList]);
            }, 500);
        });
    }

    private async fetchPlanSelectOptions(): Promise<PlanSelectOption[]> {
        return new Promise((res, _) => {
            setTimeout(() => {
                res([monthlyPlanDetails, yearlyPlanDetails]);
            }, 500);
        });
    }

    getFormData() {
        return this.formData;
    }

    getAddonOptions(type: RecurringVariant) {
        return type === 'monthly' ? this.addonOptions[0] : this.addonOptions[1];
    }

    getPlanSelectOptions(type: RecurringVariant) {
        return type === 'monthly'
            ? this.planSelectOptions[0]
            : this.planSelectOptions[1];
    }

    updateAddons(type: RecurringVariant) {
        if (this.formData[Step.ADD_ONS]?.type == null) {
            const addons = this.formData[Step.ADD_ONS] ?? {
                type,
                items: [],
            };
            this.updateFormData({
                [Step.ADD_ONS]: addons,
            });
            return;
        }

        if (this.formData[Step.ADD_ONS].type !== type) {
            const selectedAddonItems = this.formData[Step.ADD_ONS].items;
            const updatedAddonOptions = this.getAddonOptions(type)
                .options.map((option) =>
                    selectedAddonItems.some(
                        (item) => item.type === mapNameType(option.name)
                    )
                        ? {
                              type: mapNameType(option.name),
                              price: option.price,
                          }
                        : undefined
                )
                .filter(isAddonDetails);
            const updatedAddonItems = selectedAddonItems.map((item) => ({
                type: item.type,
                price: updatedAddonOptions.find(
                    ({ type, price }) => type === item.type
                )!.price,
            }));
            this.updateFormData({
                [Step.ADD_ONS]: {
                    type,
                    items: updatedAddonItems,
                },
            });
            return;
        }
    }
}

const isAddonDetails = (
    item: AddonDetails | undefined
): item is AddonDetails => {
    return !!item;
};

const monthlyPlanDetails: PlanSelectOption = {
    type: 'monthly',
    options: [
        { name: 'arcade', price: 9 },
        { name: 'advanced', price: 12 },
        { name: 'pro', price: 15 },
    ],
};

const yearlyPlanDetails: PlanSelectOption = {
    type: 'yearly',
    options: [
        { name: 'arcade', price: 90 },
        { name: 'advanced', price: 120 },
        { name: 'pro', price: 150 },
    ],
};

const monthlyAddonList: AddonOption = {
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

const yearlyAddonList: AddonOption = {
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

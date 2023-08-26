import {
    AddonDetails,
    AddonOption,
    RecurringVariant,
    SharedState,
    Step,
} from '../../../types';
import { mapNameType } from '../plan_addons/plan_addons_form';

export class SelectPlanPresenter {
    constructor(
        private readonly addonsFormData: SharedState[Step.ADD_ONS],
        private addonOptions: AddonOption[]
    ) {}

    private getAddonOptions(type: RecurringVariant) {
        return type === 'monthly' ? this.addonOptions[0] : this.addonOptions[1];
    }

    getUpdatedAddons(type: RecurringVariant) {
        if (this.addonsFormData?.type == null) {
            const addons = this.addonsFormData ?? {
                type,
                items: [],
            };
            return addons;
        }

        if (this.addonsFormData.type !== type) {
            const selectedAddonItems = this.addonsFormData.items;
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
            return {
                type,
                items: updatedAddonItems,
            };
        }
    }
}

const isAddonDetails = (
    item: AddonDetails | undefined
): item is AddonDetails => {
    return !!item;
};

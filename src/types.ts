export type PersonalInfo = Record<'name' | 'email' | 'phone', string>;

export type PlanType = 'arcade' | 'advanced' | 'pro';

export type RecurringVariant = 'monthly' | 'yearly';

export type AddOnType =
    | 'onlineService'
    | 'largerStorage'
    | 'customizableProfile';

export type AddonDetails = {
    type: RecurringVariant;
    details: Record<AddOnType, number>;
};

export type Addons = AddonDetails[];

export type PlanDetails = {
    type: RecurringVariant;
    details: Record<PlanType, number>;
};

export type SharedState = {
    personalInfo?: Partial<PersonalInfo>;
    plan?: Partial<PlanDetails>;
    addons?: Addons;
};

export type Step =
    | 'personalInfo'
    | 'selectPlan'
    | 'addons'
    | 'summary'
    | 'confirmation';

export const stepTitle: Record<Exclude<Step, 'confirmation'>, string> = {
    personalInfo: 'your info',
    selectPlan: 'select plan',
    addons: 'addon-ons',
    summary: 'summary',
};

export type StepStructure = {
    title: string;
    subtitle: string;
    Content: React.ComponentType;
    onNext?: () => void;
    onBack?: () => void;
    onClose?: () => void;
};

export type CreateStepArgs = {
    flowStore: FlowStore;
    options: {
        sharedState: SharedState;
    };
};

export type CreateStep = ({
    flowStore,
    options,
}: CreateStepArgs) => CreateStepStructure;

export type CreateStepStructure = ({
    navigationProvider,
}: {
    navigationProvider: NavigationProvider;
}) => {
    // `step` is for controlling the active step in the dialog sidebar,
    // because two steps can be consolidated into one step.
    step: Step;
    structure: StepStructure;
};

export type Flow = Record<Step, CreateStep>;

export interface NavigationProvider {
    goTo(...args: Parameters<FlowStore['goTo']>): void;
    goNext(...args: Parameters<FlowStore['goNext']>): void;
    goBack(...args: Parameters<FlowStore['goBack']>): void;
    close(): void;
}

export interface FlowStore {
    steps: Step[];
    get createCurrentStep(): CreateStepStructure | undefined;
    goTo({ step, sharedState }: { step: Step; sharedState: SharedState }): void;
    goNext({ sharedState }: { sharedState: SharedState }): void;
    goBack({ sharedState }: { sharedState: SharedState }): void;
    close(): void;
}

import type { ContentProps as DialogContentProps } from './ui/base/dialog/dialog';

export type PersonalInfo = Record<'name' | 'email' | 'phone', string>;

export type PlanType = 'arcade' | 'advanced' | 'pro';

export type RecurringVariant = 'monthly' | 'yearly';

export type AddOnType =
    | 'onlineService'
    | 'largerStorage'
    | 'customizableProfile';

export type AddonDetails = {
    type: AddOnType;
    price: number;
};

export type PlanDetails = {
    type: RecurringVariant;
    planType: PlanType;
    price: number;
};

// all steps need to be shown
export const enum Step {
    PERSONAL_INFO = 'personalInfo',
    SELECT_PLAN = 'selectPlan',
    ADD_ONS = 'addons',
    SUMMARY = 'summary',
    CONFIRMATION = 'confirmation',
}

export type SharedState = {
    [Step.PERSONAL_INFO]?: PersonalInfo;
    [Step.SELECT_PLAN]: PlanDetails;
    [Step.ADD_ONS]: { type: RecurringVariant } & {
        items: AddonDetails[];
    };
    [Step.SUMMARY]?: PlanDetails & AddonDetails[];
};

// the steps shown in the dialog sidebar
export type MainStep = Exclude<Step, 'confirmation'>;

export type SubStep = Exclude<Step, MainStep>;

// make MainStep & SubStep abstract for testing purpose
export type FlowSequence<MainStep, SubStep> = Partial<
    Record<MainStep & string, { subsequence: SubStep[] }>
>;

export type StepStructure = Pick<
    DialogContentProps,
    'title' | 'subtitle' | 'content'
> & {
    onNext?: () => void;
    onBack?: () => void;
    onClose?: () => void;
};

export type CreateStepArgs<Step, MainStep> = {
    flowStore: FlowStore<Step, MainStep>;
    options: {};
};

export type CreateStep<Step, MainStep> = ({
    flowStore,
    options,
}: CreateStepArgs<Step, MainStep>) => CreateStepStructure<Step, MainStep>;

export type CreateStepStructure<Step, MainStep> = ({
    navigationProvider,
    formHandler,
}: {
    navigationProvider: NavigationProvider<Step, MainStep>;
    formHandler: MultiStepFormHandler;
}) => {
    // `step` is for controlling the active step in the dialog sidebar,
    // because one MainStep could contain multiple sub steps.
    step: MainStep;
    structure: StepStructure;
};

export type Flow<Step, MainStep> = {
    [P in Step & string]: CreateStep<Step, MainStep>;
};

export interface NavigationProvider<Step, MainStep> {
    goTo(...args: Parameters<FlowStore<Step, MainStep>['goTo']>): void;
    goNext(...args: Parameters<FlowStore<Step, MainStep>['goNext']>): void;
    goBack(...args: Parameters<FlowStore<Step, MainStep>['goBack']>): void;
    close(): void;
}

export interface FlowStore<Step, MainStep> {
    steps: Step[];
    get createCurrentStep(): Step extends any
        ? CreateStepStructure<Step, MainStep> | undefined
        : never;
    goTo({ step }: { step: Step }): void;
    goNext(): void;
    goBack(): void;
    close(): void;
}

export interface MultiStepFormHandler {
    getFormData<U extends MainStep>(step: U): SharedState[U];
    setFormData<U extends MainStep>(step: U, data: SharedState[U]): void;
    getCurrentFormData<T extends MainStep>(step: T): SharedState[T];
    setCurrentFormData<T extends MainStep>(step: T, data: SharedState[T]): void;
    canSubmit<T extends MainStep>(step: T): boolean;
    getAddonOptions(): AddonOption[];
    getPlanSelectOptions(type: RecurringVariant): PlanSelectOption;
}

export type AddonOption = {
    type: RecurringVariant;
    options: {
        name: string;
        price: number;
        description: string;
    }[];
};

export type PlanSelectOption = {
    type: RecurringVariant;
    options: {
        name: PlanType;
        price: number;
    }[];
};

export interface FormHandler {
    get canSubmit(): boolean;
}

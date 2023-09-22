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
export type FlowSequence<MainStep extends PropertyKey, SubStep> = Partial<
    Record<MainStep, { subsequence: SubStep[] }>
>;

export type StepStructure = Pick<
    DialogContentProps,
    'title' | 'subtitle' | 'content'
> & {
    onNext?: () => void;
    onBack?: () => void;
    onClose?: () => void;
};

export type CreateStepArgs<
    Step extends PropertyKey,
    MainStep extends Step,
    SharedState
> = {
    flowStore: FlowStore<Step, MainStep, SharedState>;
    options: {};
};

export type CreateStep<
    Step extends PropertyKey,
    MainStep extends Step,
    SharedState
> = ({
    flowStore,
    options,
}: CreateStepArgs<Step, MainStep, SharedState>) => CreateStepStructure<
    Step,
    MainStep,
    SharedState
>;

export type CreateStepStructure<
    Step extends PropertyKey,
    MainStep extends Step,
    SharedState
> = ({
    navigationProvider,
    formHandler,
}: {
    navigationProvider: NavigationProvider<Step, MainStep, SharedState>;
    formHandler: MultiStepFormHandler<SharedState>;
}) => {
    // `step` is for controlling the active step in the dialog sidebar,
    // because one MainStep could contain multiple sub steps.
    step: MainStep;
    structure: StepStructure;
};

export type Flow<
    Step extends PropertyKey,
    MainStep extends Step,
    SharedState
> = {
    [P in Step & string]: CreateStep<Step, MainStep, SharedState>;
};

export interface NavigationProvider<
    Step extends PropertyKey,
    MainStep extends Step,
    SharedState
> {
    goTo(
        ...args: Parameters<FlowStore<Step, MainStep, SharedState>['goTo']>
    ): void;
    goNext(
        ...args: Parameters<FlowStore<Step, MainStep, SharedState>['goNext']>
    ): void;
    goBack(
        ...args: Parameters<FlowStore<Step, MainStep, SharedState>['goBack']>
    ): void;
    close(): void;
}

export interface FlowStore<
    Step extends PropertyKey,
    MainStep extends Step,
    SharedState
> {
    steps: Step[];
    get createCurrentStep():
        | CreateStepStructure<Step, MainStep, SharedState>
        | undefined;
    goTo({ step }: { step: Step }): void;
    goNext(): void;
    goBack(): void;
    close(): void;
}

export interface MultiStepFormHandler<SharedState> {
    getFormData<U extends keyof SharedState>(step: U): SharedState[U];
    setFormData<U extends keyof SharedState>(
        step: U,
        data: SharedState[U]
    ): void;
    canSubmit<U extends keyof SharedState>(step: U): boolean;
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

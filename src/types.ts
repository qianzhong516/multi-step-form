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

export type MainStep = Exclude<Step, 'confirmation'>;

export type SubStep = Exclude<Step, MainStep>;

export type FlowSequence = Partial<
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

export type CreateStepArgs = {
    flowStore: FlowStore;
    options: {
        sharedState: SharedState;
    };
};

export type CreateStep<T extends MainStep> = ({
    flowStore,
    options,
}: CreateStepArgs) => CreateStepStructure<T>;

export type CreateStepStructure<T extends MainStep> = ({
    navigationProvider,
    formHandler,
}: {
    navigationProvider: NavigationProvider;
    // TODO: remove optional undefined once all forms are done
    formHandler: MultiStepFormHandler<T> | undefined;
}) => {
    // `step` is for controlling the active step in the dialog sidebar,
    // because one main step could contain multiple sub steps.
    step: MainStep;
    structure: StepStructure;
};

// this is for mapping each form data type into their main step.
// E.g, MultiStepFormHandler<Step.PERSONAL_INFO>.getFormData(Step.PERSONAL_INFO)
type stepMap<T extends Step> = {
    [Step.PERSONAL_INFO]: Step.PERSONAL_INFO;
    [Step.SELECT_PLAN]: Step.SELECT_PLAN;
    [Step.ADD_ONS]: Step.ADD_ONS;
    [Step.SUMMARY]: Step.SUMMARY;
    [Step.CONFIRMATION]: Step.SUMMARY;
}[T];

export type Flow<T extends Step> = { [P in T]: CreateStep<stepMap<T>> };

export interface NavigationProvider {
    goTo(...args: Parameters<FlowStore['goTo']>): void;
    goNext(...args: Parameters<FlowStore['goNext']>): void;
    goBack(...args: Parameters<FlowStore['goBack']>): void;
    close(): void;
}

export interface FlowStore {
    steps: Step[];
    get createCurrentStep(): CreateStepStructure<MainStep> | undefined;
    goTo({ step, sharedState }: { step: Step; sharedState: SharedState }): void;
    // TODO: revisit. Is sharedState needed?
    goNext({ sharedState }: { sharedState: SharedState }): void;
    goBack({ sharedState }: { sharedState: SharedState }): void;
    close(): void;
}

export interface MultiStepFormHandler<T extends MainStep> {
    getFormData<U extends MainStep>(step: U): SharedState[U];
    setFormData<U extends MainStep>(step: U, data: SharedState[U]): void;
    getCurrentFormData(step: T): SharedState[T];
    setCurrentFormData(step: T, data: SharedState[T]): void;
    canSubmit(step: T): boolean;
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

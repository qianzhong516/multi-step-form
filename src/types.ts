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

export const enum Step {
    PERSONAL_INFO = 'personalInfo',
    SELECT_PLAN = 'selectPlan',
    ADD_ONS = 'addons',
    SUMMARY = 'summary',
    CONFIRMATION = 'confirmation',
}

export type SharedState = {
    [Step.PERSONAL_INFO]?: PersonalInfo;
    [Step.SELECT_PLAN]?: Partial<PlanDetails>;
    [Step.ADD_ONS]?: Addons;
    [Step.SUMMARY]?: PlanDetails & Addons;
};

export type MainStep = Exclude<Step, 'confirmation'>;

export type SubStep = Exclude<Step, MainStep>;

export type FlowSequence = Partial<
    Record<MainStep, { subsequence: SubStep[] }>
>;

export type StepStructure = {
    title: string;
    subtitle: string;
    content: React.ReactNode;
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
    goNext({ sharedState }: { sharedState: SharedState }): void;
    goBack({ sharedState }: { sharedState: SharedState }): void;
    close(): void;
}

export interface MultiStepFormHandler<T extends MainStep> {
    getFormData(step: T): SharedState[T];
    getFormHandler(step: T): FormHandler | undefined;
    setFormData(step: T, data: SharedState[T]): void;
    canSubmit(step: T): boolean;
}

export interface FormHandler {
    get canSubmit(): boolean;
}

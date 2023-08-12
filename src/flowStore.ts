import type {
    FlowStore,
    SharedState,
    Step,
    Flow,
    CreateStepStructure,
    MainStep,
    SubStep,
} from './types';

// TODO: how to decouple the confirmation flow with the multi-step flow [M2]
// TODO: routing node to load the first node [M2]
export class FlowStoreImpl implements FlowStore {
    steps: Step[] = [];

    constructor(
        private readonly flow: Flow,
        private currentStep: Step | null,
        private sharedState: SharedState = {},
        public flowSequence: Partial<
            Record<MainStep, { subsequence: SubStep[] }>
        >
    ) {
        this.sharedState = sharedState;
        // push main steps and sub steps into an array by order
        this.steps = (
            Object.keys(flowSequence) as (keyof typeof flowSequence)[]
        ).reduce((prev, curr, _) => {
            prev.push(curr, ...flowSequence[curr]!.subsequence);
            return prev;
        }, [] as Step[]);
    }

    get createCurrentStep(): CreateStepStructure | undefined {
        if (this.currentStep == null) {
            return;
        }

        return this.flow[this.currentStep]({
            flowStore: this,
            options: { sharedState: this.sharedState },
        });
    }

    private updateSharedState(state: SharedState) {
        this.sharedState = {
            ...this.sharedState,
            ...state,
        };
    }

    goTo({
        step,
        sharedState,
    }: {
        step: Step;
        sharedState: SharedState;
    }): void {
        this.updateSharedState(sharedState);
        this.currentStep = step;
    }

    goNext({ sharedState }: { sharedState: SharedState }): void {
        if (this.currentStep == null) {
            throw new Error('currentStep does not exist.');
        }

        this.updateSharedState(sharedState);

        const index = this.steps.indexOf(this.currentStep);
        this.currentStep = this.steps[index + 1];
    }

    goBack({ sharedState }: { sharedState: SharedState }): void {
        if (this.currentStep == null) {
            throw new Error('currentStep does not exist.');
        }

        this.updateSharedState(sharedState);

        const index = this.steps.indexOf(this.currentStep);
        this.currentStep = this.steps[index - 1];
    }

    close(): void {
        this.steps = [];
        this.currentStep = null;
    }
}

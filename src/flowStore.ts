import type {
    FlowStore,
    SharedState,
    Step,
    Flow,
    CreateStepStructure,
    FlowSequence,
    MainStep,
} from './types';

// TODO: how to decouple the confirmation flow with the multi-step flow [M2]
// TODO: routing node to load the first node [M2]
export class FlowStoreImpl implements FlowStore {
    steps: Step[] = [];

    constructor(
        // TODO: fix: a member cannot be assigned to a union type
        private readonly flow: Flow<any>,
        private currentStep: Step | null,
        public flowSequence: FlowSequence
    ) {
        // push main steps and sub steps into an array by order
        this.steps = (
            Object.keys(flowSequence) as (keyof typeof flowSequence)[]
        ).reduce((prev, curr, _) => {
            prev.push(curr, ...flowSequence[curr]!.subsequence);
            return prev;
        }, [] as Step[]);
    }

    get createCurrentStep(): CreateStepStructure<MainStep> | undefined {
        if (this.currentStep == null) {
            return;
        }

        return this.flow[this.currentStep]({
            flowStore: this,
            options: {},
        });
    }

    goTo({ step }: { step: Step }): void {
        this.currentStep = step;
    }

    goNext(): void {
        if (this.currentStep == null) {
            throw new Error('currentStep does not exist.');
        }

        const index = this.steps.indexOf(this.currentStep);
        this.currentStep = this.steps[index + 1];
    }

    goBack(): void {
        if (this.currentStep == null) {
            throw new Error('currentStep does not exist.');
        }

        const index = this.steps.indexOf(this.currentStep);
        this.currentStep = this.steps[index - 1];
    }

    close(): void {
        this.steps = [];
        this.currentStep = null;
    }
}

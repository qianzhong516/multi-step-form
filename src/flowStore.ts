import type {
    FlowStore,
    Flow,
    CreateStepStructure,
    FlowSequence,
} from './types';

/**
 * FlowStore manages the form navigation and returns a function to create the current step
 */
export class FlowStoreImpl<
    Step extends string,
    MainStep extends Step,
    SubStep extends Step,
    SharedState
> implements FlowStore<Step, MainStep, SharedState>
{
    steps: Step[] = [];

    constructor(
        private readonly flow: Flow<Step, MainStep, SharedState>,
        private currentStep: Step | null,
        public flowSequence: FlowSequence<MainStep, SubStep>
    ) {
        // push main steps and sub steps into an array by order
        this.steps = (
            Object.keys(flowSequence) as (keyof typeof flowSequence)[]
        ).reduce((prev, curr, _) => {
            prev.push(curr, ...flowSequence[curr]!.subsequence);
            return prev;
        }, [] as Step[]);
    }

    get createCurrentStep():
        | CreateStepStructure<Step, MainStep, SharedState>
        | undefined {
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

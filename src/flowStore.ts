import type {
    FlowStore,
    SharedState,
    Step,
    Flow,
    CreateStepStructure,
} from './types';

// TODO: flowStore should have visibility on when the current step is the last step
// TODO: how to decouple the confirmation flow with the multi-step flow [M2 scope?]
export class FlowStoreImpl implements FlowStore {
    steps: Step[] = [];

    constructor(
        private readonly flow: Flow,
        private currentStep: Step | null,
        private sharedState: SharedState = {}
    ) {
        this.sharedState = sharedState;
        // TODO: replace steps with `items` to customise the order of steps registered into the store
        this.steps = Object.keys(this.flow) as Step[];
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

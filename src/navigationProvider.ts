import type { NavigationProvider, FlowStore } from './types';

/**
 * NavigationProvider is a proxy to flowStore navgiations.
 * Step navigation is managed in flowStore isolately from the state management system to form an
 * object-oriented code structure, hence rerender is called manually in each type of navigation.
 */
export class NavigationProviderImpl<
    Step extends PropertyKey,
    MainStep extends Step,
    SharedState
> implements NavigationProvider<Step, MainStep, SharedState>
{
    constructor(
        private readonly flowStore: FlowStore<Step, MainStep, SharedState>,
        private readonly rerenderStep: () => void,
        private readonly closeDialog?: () => void
    ) {}

    goTo({ step }: { step: Step }): void {
        this.flowStore.goTo({ step });
        this.rerenderStep();
    }

    goNext(): void {
        this.flowStore.goNext();
        this.rerenderStep();
    }

    goBack(): void {
        this.flowStore.goBack();
        this.rerenderStep();
    }

    close(): void {
        this.flowStore.close();
        this.closeDialog?.();
    }
}

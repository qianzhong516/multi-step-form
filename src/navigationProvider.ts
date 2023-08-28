import type { NavigationProvider, FlowStore, Step } from './types';

/**
 * NavigationProvider is a proxy to flowStore navgiations.
 * Step navigation is managed in flowStore isolately from the state management system to form an
 * object-oriented code structure, hence rerender is called manually in each type of navigation.
 */
export class NavigationProviderImpl implements NavigationProvider {
    constructor(
        private readonly flowStore: FlowStore,
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

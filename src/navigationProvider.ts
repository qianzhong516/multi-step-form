import type { NavigationProvider, FlowStore, SharedState, Step } from './types';

export class NavigationProviderImpl implements NavigationProvider {
    constructor(
        private readonly flowStore: FlowStore,
        private readonly closeDialog?: () => void
    ) {}

    goTo({ step }: { step: Step }): void {
        this.flowStore.goTo({ step });
    }

    goNext(): void {
        this.flowStore.goNext();
    }

    goBack(): void {
        this.flowStore.goBack();
    }

    close(): void {
        this.flowStore.close();
        this.closeDialog?.();
    }
}

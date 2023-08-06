import type { NavigationProvider, FlowStore, SharedState, Step } from './types';

export class NavigationProviderImpl implements NavigationProvider {
    constructor(
        private readonly flowStore: FlowStore,
        private readonly closeDialog?: () => void
    ) {}

    goTo({
        step,
        sharedState,
    }: {
        step: Step;
        sharedState: SharedState;
    }): void {
        this.flowStore.goTo({ step, sharedState });
    }

    goNext({ sharedState }: { sharedState: SharedState }): void {
        this.flowStore.goNext({ sharedState });
    }

    goBack({ sharedState }: { sharedState: SharedState }): void {
        this.flowStore.goBack({ sharedState });
    }

    close(): void {
        this.flowStore.close();
        this.closeDialog?.();
    }
}

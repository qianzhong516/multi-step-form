import type { NavigationProvider, FlowStore, SharedState } from './types';

export class NavigationProviderImpl implements NavigationProvider {
    constructor(
        private readonly flowStore: FlowStore,
        private readonly closeDialog?: () => void
    ) {}

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

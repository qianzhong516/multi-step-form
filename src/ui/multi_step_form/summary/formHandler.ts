import type { FormHandler } from '../../../types';

export class SummaryFormHandler implements FormHandler {
    get canSubmit(): boolean {
        return true;
    }
}

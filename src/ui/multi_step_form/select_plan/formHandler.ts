import type { FormHandler } from '../../../types';

export class SelectPlanFormHandler implements FormHandler {
    get canSubmit(): boolean {
        return true;
    }
}

import { FormHandler } from '../../../types';

export class PlanAddonsFormHandler implements FormHandler {
    get canSubmit(): boolean {
        return true;
    }
}

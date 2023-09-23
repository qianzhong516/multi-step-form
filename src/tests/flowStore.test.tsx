import {
    CreateStep,
    Flow,
    FlowSequence,
    SharedState,
    StepStructure,
} from '../types';
import { FlowStoreImpl as FlowStore } from '../flowStore';
import { NavigationProviderImpl as NavigationProvider } from '../navigationProvider';
import { MultiStepFormHandlerImpl as MultiStepFormHandler } from '../formHandler';

jest.mock('../navigationProvider');
jest.mock('../formHandler');

const enum Step {
    PERSONAL_INFO = 'personalInfo',
    SELECT_PLAN = 'selectPlan',
    ADD_ONS = 'addons',
    SUMMARY = 'summary',
    CONFIRMATION = 'confirmation',
    ADVERTISEMENT = 'advertisement',
}

type MainStep = Exclude<Step, 'confirmation' | 'advertisement'>;

type SubStep = Exclude<Step, MainStep>;

describe('Test FlowStore', () => {
    const flowSequence: FlowSequence<MainStep, SubStep> = {
        personalInfo: {
            subsequence: [],
        },
        selectPlan: {
            subsequence: [],
        },
        addons: {
            subsequence: [Step.ADVERTISEMENT],
        },
        summary: {
            subsequence: [Step.CONFIRMATION],
        },
    };

    const flow: Flow<Step, MainStep, SharedState> = {
        personalInfo: createStepFactory(Step.PERSONAL_INFO, {
            title: 'Personal',
            subtitle: 'Fill in your personal Info',
            content: <div>Personal Info</div>,
        }),
        selectPlan: createStepFactory(Step.SELECT_PLAN, {
            title: 'Select Plan',
            subtitle: 'Select your plan',
            content: <div>Select Plan</div>,
        }),
        addons: createStepFactory(Step.ADD_ONS, {
            title: 'AddOns',
            subtitle: 'Select your addons',
            content: <div>Select Plan</div>,
        }),
        summary: createStepFactory(Step.SUMMARY, {
            title: 'Summary',
            subtitle: 'Here is your plan summary',
            content: <div>Summary</div>,
        }),
        confirmation: createStepFactory(Step.SUMMARY, {
            title: 'Thank you',
            subtitle: 'Thanks for choosing us',
            content: <div>Thank you</div>,
        }),
        advertisement: createStepFactory(Step.ADD_ONS, {
            title: 'Subscribe to our daily news',
            subtitle: 'Discover numerous discount offers',
            content: <div>Want to know more?</div>,
        }),
    };

    let flowStore: FlowStore<Step, MainStep, SubStep, SharedState>;

    beforeEach(() => {
        flowStore = new FlowStore(flow, Step.PERSONAL_INFO, flowSequence);
        // typecasting mocked classes to avoid the ts error: 'mockClear' does not
        // exist. See: https://github.com/kulshekhar/ts-jest/issues/576
        (
            NavigationProvider as jest.Mock<
                NavigationProvider<Step, MainStep, SharedState>
            >
        ).mockClear();
        (
            MultiStepFormHandler as jest.Mock<MultiStepFormHandler<SharedState>>
        ).mockClear();
    });

    it('Should store the correct steps on instantiation', () => {
        flowStore = new FlowStore(flow, Step.PERSONAL_INFO, flowSequence);
        expect(flowStore.steps).toStrictEqual([
            Step.PERSONAL_INFO,
            Step.SELECT_PLAN,
            Step.ADD_ONS,
            Step.ADVERTISEMENT,
            Step.SUMMARY,
            Step.CONFIRMATION,
        ]);
    });

    it('Should return the correct step after going back one step', () => {
        flowStore = new FlowStore(flow, Step.SELECT_PLAN, flowSequence);
        expect(flowStore.currentNode).toBe(Step.SELECT_PLAN);
        flowStore.goBack();
        expect(flowStore.currentNode).toBe(Step.PERSONAL_INFO);
    });

    it('Should return the correct step after going forward one step', () => {
        expect(flowStore.currentNode).toBe(Step.PERSONAL_INFO);
        flowStore.goNext();
        expect(flowStore.currentNode).toBe(Step.SELECT_PLAN);
    });

    it('Should return the correct step after navigating to a different step', () => {
        expect(flowStore.currentNode).toBe(Step.PERSONAL_INFO);
        flowStore.goTo({ step: Step.ADVERTISEMENT });
        expect(flowStore.currentNode).toBe(Step.ADVERTISEMENT);
    });

    it('Should return an undefined step after closing the flow', () => {
        expect(flowStore.currentNode).toBe(Step.PERSONAL_INFO);
        flowStore.close();
        expect(flowStore.currentNode).toBeNull();
        expect(flowStore.steps.length).toBe(0);
    });

    it('Should create the correct step', () => {
        expect(flowStore.currentNode).toBe(Step.PERSONAL_INFO);
        expect(flowStore.createCurrentStep).not.toBe(null);
        if (flowStore.createCurrentStep) {
            const stepArgs = flowStore.createCurrentStep({
                navigationProvider: (
                    NavigationProvider as jest.Mock<
                        NavigationProvider<Step, MainStep, SharedState>
                    >
                ).mock.instances[0],
                formHandler: (
                    MultiStepFormHandler as jest.Mock<
                        MultiStepFormHandler<SharedState>
                    >
                ).mock.instances[0],
            });
            expect(stepArgs.step).toBe(Step.PERSONAL_INFO);
            expect(stepArgs.structure.title).toBe('Personal');
            expect(stepArgs.structure.subtitle).toBe(
                'Fill in your personal Info'
            );
        }
    });
});

function createStepFactory(
    step: MainStep,
    stepStructure: StepStructure
): CreateStep<Step, MainStep, SharedState> {
    return ({ flowStore, options }) =>
        ({ navigationProvider, formHandler }) => ({
            step,
            structure: stepStructure,
        });
}

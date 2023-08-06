import type { Step } from '../../../../src/types';
import styles from './dialog.css';
import { StepCard } from './step_card/step_card';
import { Title, Text } from '../text/text';

type DialogProps = {
    currentStep: Step;
    steps: Record<string, string>;
} & ContentProps;

type ContentProps = {
    title: string;
    subtitle: string;
    Content: React.ComponentType;
    Footer: React.ComponentType;
};

type FooterProps = {
    backButtonText?: string;
    nextButtonText?: string;
    goNext?(): void;
    goBack?(): void;
};

export const Dialog = ({
    currentStep,
    steps,
    ...contentProps
}: DialogProps) => {
    return (
        <ModalLayer>
            <div className={styles.dialog}>
                <Sidebar currentStep={currentStep} steps={steps} />
                <Content {...contentProps} />
            </div>
        </ModalLayer>
    );
};

const Sidebar = ({
    currentStep,
    steps,
}: Pick<DialogProps, 'currentStep' | 'steps'>) => {
    return (
        <div className={styles.sidebar}>
            {(Object.keys(steps) as Array<keyof typeof steps>).map(
                (step, index) => (
                    <div className={styles.stepCard}>
                        <StepCard
                            key={step}
                            stepName={steps[step]}
                            stepNumber={index + 1}
                            isActive={currentStep === step}
                        />
                    </div>
                )
            )}
        </div>
    );
};

const Content = ({ title, subtitle, Content, Footer }: ContentProps) => {
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.header}>
                <Title.Large variant='primary'>{title}</Title.Large>
                <Text.Medium variant='secondary'>{subtitle}</Text.Medium>
            </div>
            <div className={styles.content}>
                <Content />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

const Footer = ({
    backButtonText,
    nextButtonText,
    goBack,
    goNext,
}: FooterProps) => {
    return <div></div>;
};

const ModalLayer = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.modalLayer}>{children}</div>
);

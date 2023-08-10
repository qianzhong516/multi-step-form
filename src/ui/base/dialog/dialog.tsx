import React from 'react';
import styles from './dialog.css';
import { StepCard } from './step_card/step_card';
import { Title, Text } from '../text/text';
import { Button } from '../button/button';

type DialogProps<Step extends string, CurrentStep extends Step> = {
    currentStep: CurrentStep;
    steps: Record<Step, string>;
} & ContentProps;

type ContentProps = {
    title: string;
    subtitle: string;
    content: React.ReactNode;
    footer: React.ReactNode;
};

export type FooterProps = {
    backButtonText?: string;
    nextButtonText?: string;
    onNext?(): void;
    onBack?(): void;
};

export const Dialog = <Step extends string, CurrentStep extends Step>({
    currentStep,
    steps,
    ...contentProps
}: DialogProps<Step, CurrentStep>) => {
    return (
        <ModalLayer>
            <div className={styles.dialog}>
                <Sidebar currentStep={currentStep} steps={steps} />
                <Content {...contentProps} />
            </div>
        </ModalLayer>
    );
};

const Sidebar = <Step extends string, CurrentStep extends Step>({
    currentStep,
    steps,
}: Pick<DialogProps<Step, CurrentStep>, 'currentStep' | 'steps'>) => {
    return (
        <div className={styles.sidebar}>
            {(Object.keys(steps) as Array<keyof typeof steps>).map(
                (step, index) => (
                    <div key={step} className={styles.stepCard}>
                        <StepCard
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

const Content = ({ title, subtitle, content, footer }: ContentProps) => {
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Title.Large variant='primary'>{title}</Title.Large>
                </div>
                <Text.Medium variant='secondary'>{subtitle}</Text.Medium>
            </div>
            <div className={styles.innerContent}>{content}</div>
            <div className={styles.footer}>{footer}</div>
        </div>
    );
};

export const Footer = ({
    backButtonText,
    nextButtonText,
    onBack,
    onNext,
}: FooterProps) => {
    return (
        <div className={styles.innerFooter}>
            {onBack && (
                <Button
                    variant='secondary'
                    onClick={onBack}
                    title={backButtonText ?? 'Go Back'}
                />
            )}
            {onNext && (
                <Button
                    variant='primary'
                    onClick={onNext}
                    title={nextButtonText ?? 'Next Step'}
                />
            )}
        </div>
    );
};

const ModalLayer = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.modalLayer}>{children}</div>
);

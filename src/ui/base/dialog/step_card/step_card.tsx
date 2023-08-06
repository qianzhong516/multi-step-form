import styles from './step_card.css';
import { Text } from '../../text/text';
import classnames from 'classnames';

type StepCardProps = {
    stepNumber: number;
    stepName: string;
    isActive: boolean;
};

export const StepCard = ({ stepNumber, stepName, isActive }: StepCardProps) => (
    <div className={styles.card}>
        <div
            className={classnames(styles.circle, {
                [styles.active]: isActive,
            })}>
            <Text.Small
                variant={isActive ? 'primary' : 'tertiary'}
                styling='bold'>
                {stepNumber}
            </Text.Small>
        </div>
        <div>
            <Text.Small variant='secondary'>
                {`Step ${stepNumber}`.toUpperCase()}
            </Text.Small>
            <Text.Small variant='tertiary' styling='bold'>
                {stepName.toUpperCase()}
            </Text.Small>
        </div>
    </div>
);

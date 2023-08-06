import styles from './button.css';
import { Text } from '../text/text';
import classnames from 'classnames';

type ButtonProps = {
    variant: 'primary' | 'secondary';
    title: string;
    onClick?(): void;
};

export const Button = ({ variant, title, onClick }: ButtonProps) => (
    <button
        className={classnames(
            styles.button,
            { [styles.primary]: variant === 'primary' },
            { [styles.secondary]: variant === 'secondary' }
        )}
        onClick={onClick}>
        <Text.Medium variant='tertiary'>{title}</Text.Medium>
    </button>
);

import styles from './select_card.css';
import { Text } from '../text/text';
import classnames from 'classnames';

export type SelectCardProps = {
    icon: React.ReactNode;
    title: string;
    subTitle: string;
    isActive?: boolean;
    description?: string;
    onClick?(): void;
};

// TODO: to address accessbility
export const SelectCard = ({
    icon,
    title,
    subTitle,
    isActive = false,
    description,
    onClick,
}: SelectCardProps) => (
    <button
        className={classnames(styles.card, { [styles.active]: isActive })}
        onClick={onClick}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>
            <Text.Medium variant='primary' styling='bold'>
                {title}
            </Text.Medium>
        </div>
        <Text.Small variant='secondary'>{subTitle}</Text.Small>
        {description && (
            <div className={styles.description}>
                <Text.ExtraSmall variant='primary'>
                    {description}
                </Text.ExtraSmall>
            </div>
        )}
    </button>
);

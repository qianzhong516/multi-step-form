import styles from './card.css';
import { Text } from '../text/text';
import classnames from 'classnames';

type CardProps = {
    icon: React.ReactNode;
    title: string;
    subTitle: string;
    isActive?: boolean;
};

export const Card = ({
    icon,
    title,
    subTitle,
    isActive = false,
}: CardProps) => (
    <div className={classnames(styles.card, { [styles.active]: isActive })}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>
            <Text.Medium variant='primary' styling='bold'>
                {title}
            </Text.Medium>
        </div>
        <Text.Small variant='secondary'>{subTitle}</Text.Small>
    </div>
);

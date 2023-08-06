import styles from './placeholder.css';
import { Text } from '../text/text';

type PlaceholderProps = {
    width: number | string;
    height: number | string;
    title: string;
};

export const Placeholder = ({ width, height, title }: PlaceholderProps) => (
    <div style={{ width, height }} className={styles.placeholder}>
        <Text.Medium variant='primary'> {title} </Text.Medium>
    </div>
);

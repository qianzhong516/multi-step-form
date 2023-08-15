import styles from './icon.css';

type IconSize = 'small' | 'medium' | 'large';

type IconProps = {
    size: number | IconSize;
    img: string;
    alt?: string;
};

const iconSizeMap = {
    small: 20,
    medium: 40,
    large: 60,
};

export const Icon = ({ size, img, alt = '' }: IconProps) => {
    let _size = iconSizeMap['medium'];

    if (typeof size === 'number') {
        _size = size;
    } else {
        _size = iconSizeMap[size];
    }

    return (
        <div style={{ width: _size, height: _size }} className={styles.icon}>
            <img className={styles.img} src={img} alt={alt} />
        </div>
    );
};

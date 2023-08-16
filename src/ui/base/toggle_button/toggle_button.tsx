import React from 'react';
import styles from './toggle_button.css';
import classnames from 'classnames';
import { Text } from '../text/text';

type ToggleButtonProps<OnState extends string, OffState extends string> = {
    defaultOn?: boolean;
    value: {
        on: OnState;
        off: OffState;
    };
    onToggle(value: OnState | OffState): void;
};

export const ToggleButton = <OnState extends string, OffState extends string>({
    defaultOn = false,
    value,
    onToggle,
}: ToggleButtonProps<OnState, OffState>) => {
    const [isOn, setIsOn] = React.useState(defaultOn);

    const onClick = () => {
        onToggle(isOn ? value.on : value.off);
        setIsOn((isOn) => !isOn);
    };

    return (
        <div className={styles.container}>
            <Text.Small variant='primary' styling='bold'>
                {value.on}
            </Text.Small>
            <button className={styles.toggleButton} onClick={onClick}>
                <div
                    className={classnames(styles.indicator, {
                        [styles.active]: isOn,
                    })}></div>
            </button>
            <Text.Small variant='primary' styling='bold'>
                {value.off}
            </Text.Small>
        </div>
    );
};

import React from 'react';
import styles from './toggle_button.css';
import classnames from 'classnames';
import { Text } from '../text/text';
import { capitalize } from '../../utils/utils';

type ToggleButtonProps<OnState extends string, OffState extends string> = {
    defaultValue: OnState | OffState;
    value: {
        on: OnState;
        off: OffState;
    };
    onToggle(value: OnState | OffState): void;
};

export const ToggleButton = <OnState extends string, OffState extends string>({
    defaultValue,
    value,
    onToggle,
}: ToggleButtonProps<OnState, OffState>) => {
    const [isOn, setIsOn] = React.useState(defaultValue === value.on);

    const onClick = () => {
        onToggle(isOn ? value.off : value.on);
        setIsOn((isOn) => !isOn);
    };

    return (
        <div className={styles.container}>
            <Text.Medium variant='primary' styling='bold'>
                {capitalize(value.off)}
            </Text.Medium>
            <button className={styles.toggleButton} onClick={onClick}>
                <div
                    className={classnames(styles.indicator, {
                        [styles.active]: isOn,
                    })}></div>
            </button>
            <Text.Medium variant='primary' styling='bold'>
                {capitalize(value.on)}
            </Text.Medium>
        </div>
    );
};

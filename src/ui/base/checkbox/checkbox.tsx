import React from 'react';
import styles from './checkbox.css';
import classnames from 'classnames';

type CheckboxProps = {
    isSelected: boolean;
    onChange(): void;
    disabled?: boolean;
};

export const Checkbox = ({
    isSelected,
    onChange,
    disabled = false,
}: CheckboxProps) => {
    return (
        <>
            <input
                type='checkbox'
                checked={isSelected}
                className={classnames(styles.checkbox, {
                    [styles.checked]: isSelected,
                    [styles.disabled]: disabled,
                })}
                onChange={onChange}
                disabled={disabled}
            />
            <label className={styles.label}></label>
        </>
    );
};

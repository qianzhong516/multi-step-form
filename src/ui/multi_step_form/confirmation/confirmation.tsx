import React from 'react';
import { Title, Text } from '../../base/text/text';
import { thankYouIcon } from '../../base/icon_image/icon_image';
import { Icon } from '../../base/icon/icon';
import styles from './confirmation.css';

export const Confirmation = () => (
    <div className={styles.container}>
        <Icon img={thankYouIcon} size='large' />
        <Title.Large variant='primary'>Thank you!</Title.Large>
        <Text.Medium variant='secondary'>
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
        </Text.Medium>
    </div>
);

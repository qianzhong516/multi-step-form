import type { Meta, StoryObj } from '@storybook/react';
import { Card as Component } from '../card';
import { Icon } from '../../icon/icon';
import { proIcon } from '../../icon_image/icon_image';

const meta = {
    title: 'Base/Card',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
    args: {
        icon: <Icon size='medium' img={proIcon} />,
        title: 'Arcade',
        subTitle: '$9/mo',
    },
};

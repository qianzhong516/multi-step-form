import type { Meta, StoryObj } from '@storybook/react';
import { SelectCard as Component } from '../select_card';
import { Icon } from '../../icon/icon';
import { proIcon } from '../../icon_image/icon_image';

const meta = {
    title: 'Base/SelectCard',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectCard: Story = {
    args: {
        icon: <Icon size='medium' img={proIcon} />,
        title: 'Arcade',
        subTitle: '$9/mo',
        description: '2 months free',
    },
};

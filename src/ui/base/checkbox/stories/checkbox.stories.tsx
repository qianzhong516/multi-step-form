import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox as Component } from '../checkbox';
import React from 'react';

const meta = {
    title: 'Base/Checkbox',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
    render: (args) => {
        // TODO: connect the state with the `isSelected` in the storybook arg
        const [isSelected, setIsSelected] = React.useState(args.isSelected);
        const onChange = () => setIsSelected((isSelected) => !isSelected);

        return (
            <Component {...args} isSelected={isSelected} onChange={onChange} />
        );
    },
    args: {
        isSelected: false,
        disabled: false,
    },
};

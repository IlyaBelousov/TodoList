import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from '../components/AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        callBack: {
            description: 'callback'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const AddItemFormTemplate: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = AddItemFormTemplate.bind({});
AddItemFormStory.args = {
    callBack: action(`Button clicked`)
};


import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from '../components/EditableSpan';


const ChangeTitle = action('change title callback');

export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,
    args:{
        ChangeTitle,
    }

} as ComponentMeta<typeof EditableSpan>;


const EditableSpanTemplate: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanStory = EditableSpanTemplate.bind({});
EditableSpanStory.args = {
    title:'JS'
};



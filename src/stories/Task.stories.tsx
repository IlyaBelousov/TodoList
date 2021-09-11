import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../components/todolist/Task';

const ChangeStatusTask = action('change task status callback');
const removeTasks = action('remove task status callback');
const ChangeTaskTitle = action('change task title callback');

export default {
    title: 'TodoList/Task',
    component: Task,
    args:{
        ChangeStatusTask,
        removeTasks,
        ChangeTaskTitle,
    }

} as ComponentMeta<typeof Task>;


const TaskTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;


export const TaskIsDoneStory = TaskTemplate.bind({});
TaskIsDoneStory.args = {
    task: {id: '1', isDone: true, title: 'JS'},
    id: 'todolistId1'
};
export const TaskIsNotDoneStory = TaskTemplate.bind({});
TaskIsNotDoneStory.args = {
    task: {id: '2', isDone: false, title: 'React'},
    id: 'todolistId1'
};


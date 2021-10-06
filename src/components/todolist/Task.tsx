import React, { ChangeEvent } from 'react';
import { Checkbox, IconButton, ListItem } from '@material-ui/core';
import { EditableSpan } from '../EditableSpan';
import { Delete } from '@material-ui/icons';
import { TaskStatuses, TaskType } from '../../api/task-api';



export type TaskPropsType = {
    task: TaskType
    removeTasks: (id: string, todolistId: string) => void
    ChangeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    ChangeTaskTitle: (todolistId: string, id: string, title: string) => void
    id: string
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task');

    const ChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.ChangeTaskStatus(props.task.id, (e.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New), props.id);
    };
    const ChangeTitle = (title: string) => {
        props.ChangeTaskTitle(props.id, props.task.id, title);
    };
    const RemoveTaskHandler = () => {
        props.removeTasks(props.task.id, props.id)
    };
    return (
        <ListItem divider={true}
            alignItems={'center'}
            key={props.task.id}>
            <span className={props.task.completed ? 'isActive' : ''}>
                <Checkbox
                    size={'small'}
                    color={'primary'}
                    onChange={ChangeStatus}
                    checked={props.task.status===TaskStatuses.Completed} />
                <EditableSpan ChangeTitle={ChangeTitle}
                    title={props.task.title} />
            </span>
            <IconButton
                color={'secondary'}
                onClick={RemoveTaskHandler}>
                <Delete style={{ fontSize: 20, margin: 10 }} />
            </IconButton>
        </ListItem>);
});

import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';


export type TaskPropsType = {
    task: TaskType
    addTask: (newTitle: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
    ChangeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    id: string
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task');

    const ChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.ChangeStatusTask(props.task.id, e.currentTarget.checked, props.id);
    };
    const ChangeTitle = (title: string) => {
        props.ChangeTaskTitle(props.task.id, title, props.id);
    };
    const RemoveTaskHandler = () => {
        props.removeTasks(props.task.id,props.id)
    };
    return (
        <ListItem divider={true}
                  alignItems={'center'}
                  key={props.task.id}>
                            <span className={props.task.isDone ? 'isActive' : ''}>
                                <Checkbox
                                    size={'small'}
                                    color={'primary'}
                                    onChange={ChangeStatus}
                                    checked={props.task.isDone}/>
                                <EditableSpan ChangeTitle={ChangeTitle}
                                              title={props.task.title}/>
                            </span>
            <IconButton
                color={'secondary'}
                onClick={RemoveTaskHandler}>
                <Delete style={{fontSize: 20, margin: 10}}/>
            </IconButton>
        </ListItem>);
});

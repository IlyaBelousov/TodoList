import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/task-reducer';

type TaskPropsType = {
    task: TaskType
    addTask: (newTitle: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
    ChangeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    id: string
}

export const Task = React.memo((props: TaskPropsType) => {

    let dispatch = useDispatch();
    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.id));
    }, [dispatch]);
    const CheckingHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, event.currentTarget.checked, props.id));
    }, [dispatch]);
    const ChangeTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.id));
    }, [dispatch]);

    return (
        <ListItem divider={true}
                  style={{justifyContent: 'space-between'}}
                  alignItems={'center'}
                  key={props.task.id}>
                            <span className={props.task.isDone ? 'isActive' : ''}>
                                <Checkbox
                                    size={'small'}
                                    color={'primary'}
                                    onChange={CheckingHandler}
                                    checked={props.task.isDone}/>
                                <EditableSpan ChangeTitle={ChangeTitleHandler} title={props.task.title}/>
                            </span>
            <IconButton
                color={'secondary'}
                onClick={removeTaskHandler}>
                <Delete style={{fontSize: 20, margin: 10}}/>
            </IconButton>
        </ListItem>);
});

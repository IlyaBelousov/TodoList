import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { filterValuesType, TasksStateType } from '../../AppWithRedux';
import { AddItemForm } from '../AddItemForm';
import { EditableSpan } from '../EditableSpan';
import { Box, Button, Checkbox, IconButton, List, ListItem } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { AppRootStateType } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { TaskStatuses, TaskType } from '../../api/task-api';
import { deleteTaskThunk, fetchTasksThunk } from '../../state/task-reducer';
import { Task } from './Task'
import { updateTaskTitleThunk, updateTaskStatusThunk } from '../../state/task-reducer'





type PropsType = {
    id: string
    title: string
    addTask: (newTitle: string, todolistId: string) => void
    changeFilter: (todolistId: string, filterValue: filterValuesType) => void
    filter: filterValuesType
    removeTodoList: (todolistId: string) => void
    ChangeTodolistTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist')
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksThunk(props.id))
    }, [])
    const ChangeTodolistTitle = useCallback((title: string) => {
        props.ChangeTodolistTitle(props.id, title);
    }, [props.ChangeTodolistTitle, props.id]);
    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'ALL');
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'Active');
    }, [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'Completed');
    }, [props.changeFilter, props.id]);
    const RemoveTodoList = useCallback(() => {
        props.removeTodoList(props.id);
    }, [props.removeTodoList, props.id]);
    const addTaskItem = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }
    const ChangeTaskTitle = useCallback((todolistId: string, id: string, title: string) => {
        dispatch(updateTaskTitleThunk(todolistId, id, title));
    }, [dispatch]);
    const removeTasks = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskThunk(todolistId, id));
    }, [dispatch]);
    const ChangeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusThunk(todolistId, id, status));
    }, [dispatch]);


    let tasksForTodolist = tasks;
    if (props.filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(f => f.status===TaskStatuses.New);

    }
    if (props.filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(f => f.status===TaskStatuses.Completed);
    }

    return <div className="todoListContainer">

        <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EditableSpan
                ChangeTitle={ChangeTodolistTitle} title={props.title} />
            <IconButton size={'small'}
                onClick={RemoveTodoList}>
                <Delete style={{ fontSize: 25, margin: 10 }} />
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskItem} />
        <List dense={true}>
            {
                tasksForTodolist && tasksForTodolist.map((m) => <Task
                    key={m.id}
                    ChangeTaskTitle={ChangeTaskTitle}
                    ChangeTaskStatus={ChangeTaskStatus}
                    removeTasks={removeTasks}
                    id={props.id}
                    task={m}
                />)
            }

        </List>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>

            <Button
                variant={props.filter === 'ALL' ? 'contained' : 'outlined'}
                size={'small'}
                color={'primary'}
                onClick={onAllClickHandler}
            >ALL</Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                onClick={onCompletedClickHandler}>Completed</Button>
        </Box>

    </div>;
});



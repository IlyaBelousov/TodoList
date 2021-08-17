import React, { useCallback} from 'react';
import {filterValuesType} from '../../AppWithRedux';
import {AddItemForm} from '../AddItemForm';
import {EditableSpan} from '../EditableSpan';
import {Box, Button, IconButton, List} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TasksStateType} from '../../AppWithRedux';
import { Task } from './Task';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    addTask: (newTitle: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
    ChangeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
    changeFilter: (todolistId: string, filterValue: filterValuesType) => void
    filter: filterValuesType
    removeTodoList: (todolistId: string) => void
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    ChangeTodolistTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id]);
    console.log('todolist');
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
    const AddTask = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id);
    }, [props.addTask, props.id]);

    let tasksForTodolist = tasks;
    if (props.filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(f => !f.isDone);

    }
    if (props.filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(f => f.isDone);
    }

    return <div className="todoListContainer">

        <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <EditableSpan
                ChangeTitle={ChangeTodolistTitle} title={props.title}/>
            <IconButton size={'small'}
                        onClick={RemoveTodoList}>
                <Delete style={{fontSize: 25, margin: 10}}/>
            </IconButton>
        </h3>
        <AddItemForm callBack={AddTask}/>
        <List dense={true}>
            {
                tasksForTodolist.map((m) => <Task
                    key={m.id}
                    ChangeTaskTitle={props.ChangeTaskTitle}
                    ChangeStatusTask={props.ChangeStatusTask}
                    removeTasks={props.removeTasks}
                    id={props.id}
                    task={m}
                    addTask={props.addTask}
                />)
            }

        </List>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>

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





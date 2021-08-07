import React, {ChangeEvent, useCallback} from 'react';
import {filterValuesType} from '../../AppWithRedux';
import {AddItemForm} from '../AddItemForm';
import {EditableSpan} from '../EditableSpan';
import {Box, Button, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TasksStateType} from '../../AppWithRedux';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TasksStateType
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

    let tasksForTodolist = props.tasks[props.id];
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

type TaskPropsType = {
    task: TaskType
    addTask: (newTitle: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
    ChangeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    id: string
}

const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTasks(props.task.id, props.id);
    }, [props.removeTasks]);
    const CheckingHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        debugger
        props.ChangeStatusTask(props.task.id, event.currentTarget.checked, props.id);
    }, [props.ChangeStatusTask]);
    const ChangeTitleHandler = useCallback((title: string) => {
        props.ChangeTaskTitle(props.task.id, title, props.id);
    }, [props.ChangeTaskTitle]);

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


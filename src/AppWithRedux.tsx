import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from './components/todolist/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    TodolistReducer
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


export type filterValuesType = 'ALL' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const removeTodoList = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId));
    };
    const addTask = (newTitle: string, todolistId: string) => {
        dispatch(addTaskAC(newTitle, todolistId));
    };
    const removeTasks = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    };
    const changeFilter = (todolistId: string, filterValue: filterValuesType) => {
        dispatch(ChangeFilterAC(todolistId, filterValue));
    };
    const ChangeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    };
    const ChangeTaskTitle = (id: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId));
    };
    const AddTodoList = (newTitle: string) => {
        debugger
        const action = AddTodolistAC(newTitle);
        dispatch(action);
    };
    const ChangeTodolistTitle = (title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(title, todoListID));
    };
    let mapedTodoLists = todolists.map(tl => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === 'Active') {
                tasksForTodolist = tasksForTodolist.filter(f => !f.isDone);

            }
            if (tl.filter === 'Completed') {
                tasksForTodolist = tasksForTodolist.filter(f => f.isDone);
            }
            return <Grid item key={tl.id}>
                <Paper
                    elevation={3}
                    style={{margin: '15px', padding: '10px', boxSizing: 'border-box'}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        ChangeStatusTask={ChangeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        ChangeTaskTitle={ChangeTaskTitle}
                        ChangeTodolistTitle={ChangeTodolistTitle}
                    />
                </Paper>
            </Grid>;
        }
    );

    return (
        <div className="App">
            <AppBar style={{marginBottom: '10px'}} position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        aria-label={'menu'}
                        color={'inherit'}
                        edge={'start'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container>
                    <AddItemForm callBack={AddTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {mapedTodoLists}
                </Grid>

            </Container>

        </div>
    );
}


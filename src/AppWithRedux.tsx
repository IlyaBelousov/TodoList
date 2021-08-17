import React, {useCallback} from 'react';
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
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/task-reducer';
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
    console.log('app');
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId));
    }, [dispatch]);
    const removeTasks = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }, [dispatch]);
    const changeFilter = useCallback((todolistId: string, filterValue: filterValuesType) => {
        dispatch(ChangeFilterAC(todolistId, filterValue));
    }, [dispatch]);
    const ChangeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    }, [dispatch]);
    const ChangeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId));
    }, [dispatch]);
    const ChangeTodolistTitle = useCallback(( todoListID: string,title: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID,title));
    }, [dispatch]);

    const addTask = useCallback((newTitle: string, todolistId: string) => {
        dispatch(addTaskAC(newTitle, todolistId));
    }, [dispatch]);
    const AddTodoList = useCallback((newTitle: string) => {
        const action = AddTodolistAC(newTitle);
        dispatch(action);
    }, [dispatch]);
    let mapedTodoLists = todolists.map(tl => {
            return <Grid item key={tl.id}>
                <Paper
                    elevation={3}
                    style={{
                        paddingTop: '0',
                        margin: '15px',
                        padding: '10px',
                        boxSizing: 'border-box'
                    }}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
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

            <Container maxWidth={'lg'}>
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


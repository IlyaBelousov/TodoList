import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/AddItemForm';
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
    ChangeFilterAC, changeTodoListTitleThunk, createTodoListThunk, deleteTodolistThunk, fetchTodoLists,
} from './state/todolist-reducer';
import {createTaskThunk} from './state/task-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodoListType } from './api/todolist-api';
import { TaskType } from './api/task-api';
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackBar} from "./components/ErrorSnackBar";



export type filterValuesType = 'ALL' | 'Active' | 'Completed'
export type TodoListDomainType = TodoListType & {
    filter: filterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = React.memo(() => {
    console.log('app');
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const status = useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])


    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(deleteTodolistThunk(todolistId));
    }, [dispatch]);

    const changeFilter = useCallback((todolistId: string, filterValue: filterValuesType) => {
        dispatch(ChangeFilterAC(todolistId, filterValue));
    }, [dispatch]);
    
    
    const ChangeTodolistTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleThunk(todoListID, title));
    }, [dispatch]);

    const addTask = useCallback((newTitle: string, todolistId: string) => {
        dispatch(createTaskThunk(todolistId, newTitle));
    }, [dispatch]);
    const AddTodoList = useCallback((newTitle: string) => {
        dispatch(createTodoListThunk(newTitle));
    }, [dispatch]);
    let mapedTodoLists = todoLists.map(tl => {
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
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    ChangeTodolistTitle={ChangeTodolistTitle}
                />
            </Paper>
        </Grid>;
    }
    );

    return (
        <div className="App">
            <AppBar style={{ marginBottom: '10px' }} position={'static'}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <IconButton
                        aria-label={'menu'}
                        color={'inherit'}
                        edge={'start'}>
                        <Menu />
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
                {status==='loading'&&<LinearProgress/>}
            </AppBar>
                <Grid container  justifyContent={'center'}>
                    <AddItemForm callBack={AddTodoList} />
                </Grid>
            <Container maxWidth={'lg'}>
                <Grid container spacing={5}>
                    {mapedTodoLists}
                </Grid>
            </Container>
            <ErrorSnackBar/>
        </div>
    );
});


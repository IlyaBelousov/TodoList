import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from './components/todolist/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    ChangeFilterAC, changeTodoListTitleThunk, createTodoListThunk, deleteTodolistThunk, fetchTodoLists,
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, createTaskThunk, removeTaskAC} from './state/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodoListType} from './api/todolist-api';
import {TaskType} from './api/task-api';



export type filterValuesType = 'ALL' | 'Active' | 'Completed'
export type TodoListDomainType = TodoListType&{
    filter: filterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = React.memo(() => {
    console.log('app');
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const dispatch = useDispatch();
    useEffect(()=>{
            dispatch(fetchTodoLists())
    },[])


    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(deleteTodolistThunk(todolistId));
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
    const ChangeTodolistTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleThunk(todoListID, title));
    }, [dispatch]);

    const addTask = useCallback((newTitle: string, todolistId: string) => {
        dispatch(createTaskThunk( todolistId,newTitle));
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
});


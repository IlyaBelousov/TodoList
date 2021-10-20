import React, {useCallback} from 'react';
import './App.css';

import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodoListType} from './api/todolist-api';
import {TaskType} from './api/task-api';
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackBar} from "./components/ErrorSnackBar";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./components/Login";
import {TodoListList} from "./components/TodoListList";
import {LogOutTC} from "./state/auth-reducer";


export type filterValuesType = 'ALL' | 'Active' | 'Completed'
export type TodoListDomainType = TodoListType & {
    filter: filterValuesType
    entityStatus: RequestStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = React.memo(() => {
    console.log('app');
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch=useDispatch()
    const logOutHandler=useCallback(()=>{
        if(!isLoggedIn)return <Redirect to={'/Todolist/login'}/>
        dispatch(LogOutTC())
    },[isLoggedIn])

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
                    {isLoggedIn&&<Button onClick={logOutHandler}
                                          color={'inherit'}>LogOut</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/Todolist'} render={() => <TodoListList/>}/>
                    <Route path={'/Todolist/login'} render={() => <Login/>}/>
                </Switch>
            </Container>
            <ErrorSnackBar/>
        </div>
    );
});


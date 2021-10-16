import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {filterValuesType, TodoListDomainType} from "../AppWithRedux";
import {
    ChangeFilterAC,
    changeTodoListTitleThunk,
    createTodoListThunk,
    deleteTodolistThunk,
    fetchTodoLists
} from "../state/todolist-reducer";
import {Container, Grid, Paper} from "@material-ui/core";
import {Todolist} from "./todolist/Todolist";
import {createTaskThunk} from "../state/task-reducer";
import {AddItemForm} from "./AddItemForm";
import {Redirect} from "react-router-dom";
import {SetIsLoggedInTC} from "../state/auth-reducer";


export const TodoListList = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
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
    if (!isLoggedIn) {
        return <Redirect to={'/Todolist/login'}/>
    }
    return <>
        <Grid container justifyContent={'center'}>
            <AddItemForm callBack={AddTodoList}/>
        </Grid>
        <Container maxWidth={'lg'}>
            <Grid container spacing={5}>
                {
                    todoLists.map(tl => {
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
                                        entityStatus={tl.entityStatus}
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
                    )
                }
            </Grid>
        </Container>

    </>

};


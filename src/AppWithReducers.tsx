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


export type filterValuesType = 'ALL' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID_1 = v1();
    let todoListID_2 = v1();
    let [todoLists, dispatchToTodolistsReducer] = useReducer(TodolistReducer, [
        {
            id: todoListID_1,
            title: 'What to learn?',
            filter: 'ALL'
        },

        {
            id: todoListID_2,
            title: 'What to buy?',
            filter: 'ALL'
        }
    ]);


    let [allTasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false}
        ]
    });
    const removeTodoList = (todolistId: string) => {
        dispatchToTodolistsReducer(RemoveTodolistAC(todolistId));
    };
    const addTask = (newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(newTitle, todolistId));
    };
    const removeTasks = (id: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(id, todolistId));
    };
    const changeFilter = (todolistId: string, filterValue: filterValuesType) => {
        dispatchToTodolistsReducer(ChangeFilterAC(todolistId, filterValue));
    };
    const ChangeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId));
    };
    const ChangeTaskTitle = (id: string, title: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id, title, todolistId));
    };
    const AddTodoList = (newTitle: string) => {
        debugger
        const action = AddTodolistAC(newTitle);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action)
    };
    const ChangeTodolistTitle = (title: string, todoListID: string) => {
        dispatchToTodolistsReducer(ChangeTodolistTitleAC(title, todoListID));
    };
    let mapedTodoLists = todoLists.map(tl => {
            let tasksForTodolist = allTasks[tl.id];
            if (tl.filter === 'Active') {
                tasksForTodolist = tasksForTodolist.filter(f => !f.isDone);

            }
            if (tl.filter === 'Completed') {
                tasksForTodolist = tasksForTodolist.filter(f => f.isDone);
            }
            return <Grid item key={tl.id}>
                <Paper
                    elevation={5}
                    style={{margin: '15px', padding: '15px', boxSizing: 'border-box'}}><Todolist
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
                /></Paper>
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

export default AppWithReducers;

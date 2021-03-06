import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TodolistActionsType, TodolistReducer} from './todolist-reducer';
import {TasksActionsType, tasksReducer} from './task-reducer';
import thunk from 'redux-thunk'
import {AppActionsTypes, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";

export type ActionsTypes= AppActionsTypes|TodolistActionsType|TasksActionsType|AuthActionsType

const rootReducer = combineReducers({
    todoLists: TodolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth:authReducer,
});


export type AppRootStateType= ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,applyMiddleware(thunk));
// @ts-ignore
window.store = store;
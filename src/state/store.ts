import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TodolistReducer} from './todolist-reducer';
import {tasksReducer} from './task-reducer';
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todoLists: TodolistReducer,
    tasks: tasksReducer,
    app: appReducer,
});


export type AppRootStateType= ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,applyMiddleware(thunk));
// @ts-ignore
window.store = store;
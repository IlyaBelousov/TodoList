import {combineReducers, createStore} from 'redux';
import {TodolistReducer} from './todolist-reducer';
import {tasksReducer} from './task-reducer';


const rootReducer = combineReducers({
    todoLists: TodolistReducer,
    tasks: tasksReducer
});


export type AppRootStateType= ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);
// @ts-ignore
window.store = store;
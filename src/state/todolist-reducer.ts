import {TodoListType} from '../App';
import {ActionType} from './user-reducer';
import {v1} from 'uuid';

export const TodolistReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f=>f.id!==action.id)
        case 'CHANGE-FILTER':
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.key;
               return [...state];
            }
            else return state;
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType = {
                id: action.id,
                title: action.title,
                filter: 'ALL'
            };

            return [...state,newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return (state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title};
                }
                return tl;
            }));
        default :
            return state;
    }
};
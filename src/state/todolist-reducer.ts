import {filterValuesType, TodoListType} from '../AppWithRedux';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
export type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    id: string
    filterValue: filterValuesType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type TodolistActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeFilterActionType
    | ChangeTodolistTitleActionType

const InitialState: Array<TodoListType> = [];

export const TodolistReducer = (state: Array<TodoListType> = InitialState, action: TodolistActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f => f.id !== action.id);
        case 'CHANGE-FILTER':
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filterValue;
                return [...state];
            } else return state;
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType = {
                id: action.id,
                title: action.title,
                filter: 'ALL'
            };
            return [...state, newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl)
        default :
            return state;
    }
};
export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID};
};
export const AddTodolistAC = (newTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', id: v1(), title: newTitle};
};
export const ChangeFilterAC = (todolistID: string, filterValue: filterValuesType): ChangeFilterActionType => {
    return {type: 'CHANGE-FILTER', id: todolistID, filterValue: filterValue};
};
export const ChangeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: newTitle};
};
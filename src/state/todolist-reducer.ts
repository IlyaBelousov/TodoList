import {filterValuesType, TodoListType} from '../App';
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
export let todoListID_1 = v1();
export let todoListID_2 = v1();
const InitialState: Array<TodoListType> = [
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
];

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
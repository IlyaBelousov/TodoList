import {filterValuesType, TodoListDomainType} from '../AppWithRedux';
import {Dispatch} from 'redux';
import {todolistAPI} from '../api/todolist-api';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {ActionsTypes} from "./store";


export type TodolistActionsType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeFilterAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof fetchTodoListsAction>
    | ReturnType<typeof createTodolistAction>
    | ReturnType<typeof setEntityStatusAC>


const InitialState: Array<TodoListDomainType> = [];

export const TodolistReducer = (state: Array<TodoListDomainType> = InitialState, action: TodolistActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-ENTITY-STATUS":{
            return state.map(tl=>tl.id===action.todoListId?{...tl,entityStatus:action.entityStatus}:tl)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.id);
        }
        case 'CHANGE-FILTER': {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filterValue;
                return [...state];
            } else return state;
        }
        case 'CREATE-TODOLIST': {
            return [{...action.payload, filter: 'ALL', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl);
        }
        case 'FETCH-TODOLISTS': {
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: 'ALL',
                    entityStatus: 'idle'
                }
            });
        }
        default :
            return state;
    }
};
export const RemoveTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistID} as const;
};
export const setEntityStatusAC = (todoListId: string,entityStatus: RequestStatusType) => {
    return {type: 'SET-ENTITY-STATUS',todoListId, entityStatus} as const
}

export const ChangeFilterAC = (todolistID: string, filterValue: filterValuesType) => {
    return {type: 'CHANGE-FILTER', id: todolistID, filterValue: filterValue} as const;
};
export const ChangeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: newTitle} as const;
};
export const fetchTodoListsAction = (todoLists: Array<TodoListDomainType>) => {
    return {
        type: 'FETCH-TODOLISTS',
        todoLists
    } as const;
};
export const createTodolistAction = (id: string, title: string, addedDate: string, order: number) => {
    return {
        type: 'CREATE-TODOLIST',
        payload: {
            id,
            addedDate,
            order,
            title,
        }
    } as const
};
export const fetchTodoLists = () => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodoLists()
        .then(response => dispatch(fetchTodoListsAction(response.data)));
    dispatch(setAppStatusAC('idle'))
};
export const createTodoListThunk = (todoTitle: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodoList(todoTitle)
        .then(response => {
            if (response.data.resultCode !== 0) {
                dispatch(setAppErrorAC(response.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            } else {
                const {id, addedDate, order, title} = response.data.data.item;
                dispatch(createTodolistAction(id, title, addedDate, order))
                dispatch(setAppStatusAC('idle'))
            }

        })
};
export const deleteTodolistThunk = (todoListId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setEntityStatusAC(todoListId,'loading'))
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodoList(todoListId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(RemoveTodolistAC(todoListId))
                dispatch(setAppStatusAC('idle'))
                dispatch(setEntityStatusAC(todoListId,'idle'))
            }
        })
}
export const changeTodoListTitleThunk = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.changeTodoListTitle(todoListId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(ChangeTodolistTitleAC(todoListId, title))
                dispatch(setAppStatusAC('idle'))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            }
        })
}
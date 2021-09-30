import {filterValuesType, TodoListDomainType} from '../AppWithRedux';
import {Dispatch} from 'redux';
import {todolistAPI} from '../api/todolist-api';


export type TodolistActionsType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeFilterAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof fetchTodoListsAction>
    | ReturnType<typeof createTodolistAction>

const InitialState: Array<TodoListDomainType> = [];

export const TodolistReducer = (state: Array<TodoListDomainType> = InitialState, action: TodolistActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
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
        case 'CREATE-TODOLIST':{
            return [...state,{...action.payload,filter:'ALL'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl);
        }
        case 'FETCH-TODOLISTS': {
            return action.todoLists;
        }
        default :
            return state;
    }
};
export const RemoveTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistID} as const;
};

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
        payload:{
            id,
            addedDate,
            order,
            title,

        }
    } as const
};
export const fetchTodoLists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodoLists()
        .then(response => dispatch(fetchTodoListsAction(response.data)));
};
export const createTodoListThunk = (todoTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodoList(todoTitle)
        .then(response => {
            debugger
            const {id, addedDate, order, title} = response.data.data.item;
            dispatch(createTodolistAction(id,title,addedDate,order))
        });
};
export const deleteTodolistThunk=(todoListId:string)=>(dispatch: Dispatch)=>{
    todolistAPI.deleteTodoList(todoListId)
        .then(response=>{
            if(response.data.resultCode===0){
                dispatch(RemoveTodolistAC(todoListId))
            }
        })
}
export const changeTodoListTitleThunk=(todoListId:string,title:string)=>(dispatch: Dispatch)=>{
    debugger
    todolistAPI.changeTodoListTitle(todoListId,title)
        .then(response=>{
            if(response.data.resultCode===0){
                dispatch(ChangeTodolistTitleAC(todoListId,title))
            }
        })
}
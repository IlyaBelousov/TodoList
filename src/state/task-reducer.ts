import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../components/todolist/Todolist';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todoListID_1,
    todoListID_2
} from './todolist-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string

}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistID: string
}


export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
const InitialState: TasksStateType = {
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
};


export const tasksReducer = (state: TasksStateType = InitialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state};
            copyState[action.todolistID] = copyState[action.todolistID]
                .filter(task => task.id !== action.taskID);
            return copyState;
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.taskTitle, isDone: false};
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]};

        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistID]: [...state[action.todolistID].map(t => {
                    if (t.id === action.taskID) {
                        return {...t, isDone: action.isDone};
                    }
                    return t;
                })]
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)]
            };
        }
        case 'ADD-TODOLIST': {
            debugger
            return {...state, [action.id]: []};
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        default :
            return state;
    }
};
export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistID: todolistID} as const;
};
export const addTaskAC = (newTitle: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle: newTitle, todolistID} as const;
};
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone: isDone, todolistID} as const;
};
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID} as const;
};

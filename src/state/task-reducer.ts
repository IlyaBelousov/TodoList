import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {TodolistActionsType} from './todolist-reducer';
import {taskAPI, TaskPriority, TaskStatuses, TaskType} from '../api/task-api';
import { Dispatch } from 'redux';


export type TasksActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof fetchTasksAC>
    | TodolistActionsType
const InitialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = InitialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state};
            copyState[action.todolistID] = copyState[action.todolistID]
                .filter(task => task.id !== action.taskID);
            return copyState;
        }

        case 'ADD-TASK': {
            const stateCopy={...state}
            let newTask: TaskType = {
                id: action.taskId,
                title: action.taskTitle,
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriority.Hi,
                startDate: '',
                status: TaskStatuses.Completed,
                todoListId: action.todolistID
            };
            const tasks = stateCopy[action.todolistID]
            const newTasks= [newTask,...tasks]
            stateCopy[action.todolistID]=newTasks
            return stateCopy;
        }
        case 'FETCH-TASKS': {
            return {...state, [action.todolistId]:action.tasks}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)]
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
        case 'CREATE-TODOLIST': {
            return {[action.payload.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'FETCH-TODOLISTS':{
            let stateCopy={...state}
            action.todoLists.forEach(tl=>{
                stateCopy[tl.id]=[]
            })
            return stateCopy
        }

        default :
            return state;
    }
};
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistID: todolistID} as const;
};
export const addTaskAC = (newTitle: string, todolistID: string,taskId:string) => {
    return {type: 'ADD-TASK', taskTitle: newTitle, todolistID,taskId} as const;
};
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone: isDone, todolistID} as const;
};
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID} as const;
};
export const fetchTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: 'FETCH-TASKS',
        todolistId,
        tasks
    } as const;
};

export const fetchTasksThunk = (todolistId:string) => (dispatch:Dispatch) => {
    taskAPI.getTasks(todolistId)
        .then(response=>{
            dispatch(fetchTasksAC(todolistId,response.data.items))
        })
};
export const createTaskThunk=(todolistId:string,title:string)=>(dispatch:Dispatch)=>{
    taskAPI.createTask(todolistId,title)
        .then(response=>{
            if(response.data.resultCode===0){
                debugger
                dispatch(addTaskAC(title,todolistId,response.data.data.id))

            }
        })
}

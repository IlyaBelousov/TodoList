import { AppRootStateType } from './store';
import { TasksStateType } from '../AppWithRedux';
import { TodolistActionsType } from './todolist-reducer';
import { taskAPI, TaskPriority, TaskStatuses, TaskType, updateTaskModelType } from '../api/task-api';
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
            let copyState = { ...state };
            copyState[action.todolistID] = copyState[action.todolistID]
                .filter(task => task.id !== action.taskID);
            return copyState;
        }

        case 'ADD-TASK': {
            const stateCopy = { ...state }
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
                status: TaskStatuses.New,
                todoListId: action.todolistID
            };
            const tasks = stateCopy[action.todolistID]
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy;
        }
        case 'FETCH-TASKS': {
            return { ...state, [action.todolistId]: action.tasks }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    status: action.status
                } : t)]
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID
                    ? {
                        ...t,
                        title:action.title
                    }
                    : t)
            }
        }
        case 'CREATE-TODOLIST': {
            return { [action.payload.id]: [] }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        }
        case 'FETCH-TODOLISTS': {
            let stateCopy = { ...state }
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        default:
            return state;
    }
};
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return { type: 'REMOVE-TASK', taskID, todolistID } as const;
};
export const addTaskAC = (newTitle: string, todolistID: string, taskId: string) => {
    return { type: 'ADD-TASK', taskTitle: newTitle, todolistID, taskId } as const;
};
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskID, status, todolistID } as const;
};
export const changeTaskTitleAC = (taskID: string, todolistID: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskID, todolistID, title } as const;
};
export const fetchTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: 'FETCH-TASKS',
        todolistId,
        tasks
    } as const;
};

export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistId)
        .then(response => {
            dispatch(fetchTasksAC(todolistId, response.data.items))
        })
};
export const createTaskThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item.title, response.data.data.item.todoListId, response.data.data.item.id))
            }
        })
}
export const deleteTaskThunk = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todoListId, taskId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todoListId))
            }
        })
}
export const updateTaskTitleThunk = (todoListId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todoListId].find(t => t.id === taskId)
    if (!task) {
        return
    }
    const model: updateTaskModelType = {
        completed: task.completed,
        addedDate: task.addedDate,
        deadline: task.deadline,
        description: task.description,
        order: task.order,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title
    }
    taskAPI.updateTaskTitle(todoListId, taskId, model)
        .then(response => {
                dispatch(changeTaskTitleAC(taskId,todoListId,title))
        })
}

export const updateTaskStatusThunk = (todoListId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todoListId].find(t => t.id === taskId)
    if (!task) {
        return
    }
    const model: updateTaskModelType = {
        completed: task.completed,
        addedDate: task.addedDate,
        deadline: task.deadline,
        description: task.description,
        order: task.order,
        priority: task.priority,
        startDate: task.startDate,
        status,
        title:task.title
    }
    taskAPI.updateTaskStatus(todoListId, taskId, model)
        .then(response => {
                dispatch(changeTaskStatusAC(taskId,status,todoListId))
                console.log(response.data.data)
        })
}
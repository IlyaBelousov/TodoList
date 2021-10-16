import axios from 'axios';
import { RequestType } from './todolist-api';

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type updateTaskModelType={
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriority
    startDate: string
    deadline: string
    order: number
    addedDate: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd60dcf74-681a-4412-9b6b-cffe62026499'
    }
});
export const taskAPI = {
    getTasks: (todoListId: string) => {
        return instance.get<{ items: TaskType[] }>(`${todoListId}/tasks`);
    },
    createTask: (todoListId: string, title: string) => {
        return instance.post<RequestType<{ item: TaskType }>>(`${todoListId}/tasks`, { title })
    },
    deleteTask: (todoListId: string,taskId: string) => {
        return instance.delete<RequestType<{}>>(`${todoListId}/tasks/${taskId}`)
    },
    updateTaskTitle: (todoListId: string, taskId: string, model:updateTaskModelType) => {
        return instance.put<RequestType<{ item: TaskType }>>(`${todoListId}/tasks/${taskId}`,model)
    },
    updateTaskStatus:(todoListId: string, taskId: string, model:updateTaskModelType)=>{
        return instance.put<RequestType<{ item: TaskType }>>(`${todoListId}/tasks/${taskId}`,model)
    }
};
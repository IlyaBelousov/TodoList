import axios from 'axios';
import {RequestType} from './todolist-api';

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

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '4e9f6c7c-553d-4c3d-8aa0-0bbb01a71677'
    }
});
export const taskAPI = {
    getTasks: (todoListId: string) => {
        return instance.get<{items:TaskType[]}>(`${todoListId}/tasks`);
    },
    createTask:(todoListId: string,title:string)=>{
        return instance.post<RequestType<TaskType>>(`${todoListId}/tasks`,{title})
    }
};
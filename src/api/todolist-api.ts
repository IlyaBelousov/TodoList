import axios from 'axios';


export type TodoListType={
    id:string
    addedDate: string
    order:number
    title:string
}

export type RequestType<T> = {
    data: T
    resultCode: number
    messages: Array<string>
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '4e9f6c7c-553d-4c3d-8aa0-0bbb01a71677'
    }
});
export const todolistAPI = {
    getTodoLists: () => {
        return instance.get('');
    },
    createTodoList: (title: string) => {
        return instance.post<RequestType<{item:TodoListType}>>('', {title});
    },
    deleteTodoList:(todoListId:string)=>{
        return instance.delete<RequestType<{}>>(`${todoListId}`)
    },
    changeTodoListTitle:(todoListId:string,title:string)=>{
        return instance.put<RequestType<{}>>(`${todoListId}`,{title})
    }
};
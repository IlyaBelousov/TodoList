import React from 'react';
import './App.css';
import {Todolist} from './components/todolist/Todolist';

export type TasksType = {
    id:number,
    isDone: boolean,
    title: string
}
export type TodolistPropsType={
    title:string,
    task:Array<TasksType>
}

function App() {
    let task1:Array<TasksType> = [
        {id:1, isDone: true, title: 'HTML&CSS'},
        {id:2, isDone: true, title: 'JS'},
        {id:3, isDone: false, title: 'React'}
    ];
    let task2:Array<TasksType> = [
        {id:1, isDone: true, title: 'Milk'},
        {id:2, isDone: true, title: 'Water'},
        {id:3, isDone: false, title: 'Meat'}
    ];
    return (
        <div className="App">
            <Todolist title={'What to Learn?'} task={task1} />
            <Todolist title={'What to buy?'} task={task2}/>

        </div>
    );
}

export default App;

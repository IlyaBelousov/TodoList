import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';

export type ValueType = 'ALL'|'Active'|'Completed'

function App() {

    /*let tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "JS", isDone: true },
        { id: 5, title: "ReactJS", isDone: false }

    ]*/
    let [tasks1,setTasks1]= useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "JS", isDone: true },
        { id: 5, title: "ReactJS", isDone: false }
    ]);

    const removeTasks= (id:number) =>{
        tasks1= tasks1.filter(f=>f.id!==id)
        setTasks1(tasks1)
        console.log(tasks1)

    }
    const changeFilter= (value:ValueType) =>{

        console.log(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks1}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;

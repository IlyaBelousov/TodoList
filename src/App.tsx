import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';

export type keyType = 'ALL'|'Active'|'Completed'

function App() {

    let [tasks1,setTasks1]= useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "JS", isDone: true },
        { id: 5, title: "Redux", isDone: false }
    ]);

    let [filter,setFilter]= useState<keyType>('ALL')

    const removeTasks= (id:number) =>{
        tasks1= tasks1.filter(f=>f.id!==id)
        setTasks1(tasks1)


    }
    const changeFilter= (key:keyType) =>{
        setFilter(key)

    }
    let copyTasks1 = tasks1;
    if(filter==='Active'){
        copyTasks1= tasks1.filter(f=>f.isDone===false)

    }
    if(filter==='Completed'){
        copyTasks1= tasks1.filter(f=>f.isDone===true)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={copyTasks1}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;

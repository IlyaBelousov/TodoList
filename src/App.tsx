import React, { useState } from 'react';
import {v1} from 'uuid';
import './App.css';
import { Todolist } from './components/todolist/Todolist';

export type keyType = 'ALL'|'Active'|'Completed'

function App() {

    let [tasks1,setTasks1]= useState( [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "Redux", isDone: false }
    ]);
    const addTask=(newTitle:string)=>{

            let newTask= { id: v1(), title: newTitle, isDone: false }
            setTasks1([newTask,...tasks1]);

    }

    let [filter,setFilter]= useState<keyType>('ALL')

    const removeTasks= (id:string) =>{
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

    const ChangeStatusTask=(id:string,isDone:boolean)=>{
        let currentTask= tasks1.find(task=>task.id===id);
        if(currentTask){
            currentTask.isDone=isDone;
            setTasks1([...tasks1])
        }
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={copyTasks1}
                addTask={addTask}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                ChangeStatusTask={ChangeStatusTask}
                filter={filter}
            />

        </div>
    );
}

export default App;

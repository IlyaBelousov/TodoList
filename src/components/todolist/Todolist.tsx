import React from 'react';
import {keyType} from '../../App';
import Button from '../Button';
import Input from '../Input';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (newTitle: string)=>void
    removeTasks: (id: string) => void
    changeFilter: (key: keyType) => void
}

export function Todolist(props: PropsType) {
    const changeFilterAll = () => {
        props.changeFilter('ALL');
    };
    const changeFilterActive = () => {
        props.changeFilter('Active');
    };
    const changeFilterCompleted = () => {
        props.changeFilter('Completed');
    };
    return <div>
        <h3>{props.title}</h3>
        <Input callBack={(newTitle: string)=>props.addTask(newTitle)}/>
        <ul>
            {
                props.tasks.map((m) => {
                    const removeTaskHandler = () => {
                        props.removeTasks(m.id);
                    };
                    return (
                        <li key={m.id}>
                            <Button callBack={removeTaskHandler} value={'x'}/>

                            <input type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span>
                        </li>);
                })
            }

        </ul>
        <div>
            <Button callBack={changeFilterAll} value={'ALL'}/>
            <Button callBack={changeFilterActive} value={'Active'}/>
            <Button callBack={changeFilterCompleted} value={'Completed'}/>
            {/*<button onClick={()=> props.changeFilter('ALL')}>All</button>*/}
            {/*<button onClick={()=> props.changeFilter('Active')}>Active</button>*/}
            {/*<button onClick={()=> props.changeFilter('Completed')}>Completed</button>*/}
        </div>
    </div>;
}


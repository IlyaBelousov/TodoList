import React, {ChangeEvent} from 'react';
import {keyType} from '../../App';
import Button from '../Button';
import Input from '../Input';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (newTitle: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
    changeFilter: (key: keyType, todolistId: string) => void
    ChangeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
    filter: keyType
    removeTodoList: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    return <div>
        <h3>{props.title}</h3><button onClick={()=>props.removeTodoList(props.id)}>x</button>
        <Input callBack={(newTitle: string) => props.addTask(newTitle, props.id)}/>
        <ul>
            {
                props.tasks.map((m) => {
                    const removeTaskHandler = () => {
                        props.removeTasks(m.id, m.id);
                    };
                    const CheckingHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeStatusTask(m.id, event.currentTarget.checked, m.id);
                    };
                    return (
                        <li className={m.isDone ? 'isActive' : ''} key={m.id}>
                            <button onClick={removeTaskHandler} value={'x'}>x</button>
                            <input onChange={CheckingHandler} type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span>
                        </li>);
                })
            }

        </ul>
        <div>

            <Button value={'ALL'} changeFilter={props.changeFilter} filter={props.filter} id={props.id}/>
            <Button value={'Active'} changeFilter={props.changeFilter} filter={props.filter} id={props.id}/>
            <Button value={'Completed'} changeFilter={props.changeFilter} filter={props.filter} id={props.id}/>


            {/*<button className={props.filter==='ALL'?'activeFilter':''} onClick={()=> props.changeFilter('ALL')}>All</button>
            <button className={props.filter==='Active'?'activeFilter':''} onClick={()=> props.changeFilter('Active')}>Active</button>
            <button className={props.filter==='Completed'?'activeFilter':''} onClick={()=> props.changeFilter('Completed')}>Completed</button>*/}
        </div>
    </div>;
}


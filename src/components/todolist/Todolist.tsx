import React, {ChangeEvent} from 'react';
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
    ChangeStatusTask:(id:string,isDone:boolean)=>void
    filter:keyType
}

export function Todolist(props: PropsType) {

    return <div>
        <h3>{props.title}</h3>
        <Input callBack={(newTitle: string)=>props.addTask(newTitle)}/>
        <ul>
            {
                props.tasks.map((m) => {
                    const removeTaskHandler = () => {
                        props.removeTasks(m.id);
                    };
                    const CheckingHandler=(event:ChangeEvent<HTMLInputElement>)=>{
                        props.ChangeStatusTask(m.id, event.currentTarget.checked)
                    }
                    return (
                        <li className={m.isDone?'isActive':''} key={m.id}>
                            <button onClick={removeTaskHandler} value={'x'}>x</button>
                            <input onChange={CheckingHandler} type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span>
                        </li>);
                })
            }

        </ul>
        <div>

            <Button value={'ALL'} changeFilter={props.changeFilter} filter={props.filter}/>
            <Button value={'Active'} changeFilter={props.changeFilter} filter={props.filter}/>
            <Button value={'Completed'} changeFilter={props.changeFilter} filter={props.filter}/>



            {/*<button className={props.filter==='ALL'?'activeFilter':''} onClick={()=> props.changeFilter('ALL')}>All</button>
            <button className={props.filter==='Active'?'activeFilter':''} onClick={()=> props.changeFilter('Active')}>Active</button>
            <button className={props.filter==='Completed'?'activeFilter':''} onClick={()=> props.changeFilter('Completed')}>Completed</button>*/}
        </div>
    </div>;
}


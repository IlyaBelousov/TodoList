import React, {ChangeEvent} from 'react';
import {keyType} from '../../App';
import Button from '../Button';
import {AddItemForm} from '../AddItemForm';
import {EditableSpan} from '../EditableSpan';

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
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    ChangeTodolistTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {
    const ChangeTodolistTitle = (title:string) => {
        props.ChangeTodolistTitle(title,props.id)
    };

    return <div className="todoListContainer">
        <h3><EditableSpan ChangeTitle={ChangeTodolistTitle} title={props.title}/>
            <button onClick={() => props.removeTodoList(props.id)}>x</button>
        </h3>
        <AddItemForm callBack={(newTitle: string) => props.addTask(newTitle, props.id)}/>
        <ul>
            {
                props.tasks.map((m) => {
                    const removeTaskHandler = () => {
                        props.removeTasks(m.id, props.id);
                    };
                    const CheckingHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeStatusTask(m.id, event.currentTarget.checked, props.id);
                    };
                    const ChangeTitleHandler = (title: string) => {
                        props.ChangeTaskTitle(m.id, title, props.id);
                    };

                    return (
                        <li className={m.isDone ? 'isActive' : ''} key={m.id}>
                            <button onClick={removeTaskHandler} value={'x'}>x</button>
                            <input onChange={CheckingHandler} type="checkbox" checked={m.isDone}/>
                            <EditableSpan ChangeTitle={ChangeTitleHandler} title={m.title}/>
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


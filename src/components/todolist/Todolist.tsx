import React, {ChangeEvent} from 'react';
import {filterValuesType} from '../../App';
import {AddItemForm} from '../AddItemForm';
import {EditableSpan} from '../EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


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
    changeFilter: (key: filterValuesType, todolistId: string) => void
    ChangeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
    filter: filterValuesType
    removeTodoList: (todolistId: string) => void
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    ChangeTodolistTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {
    const ChangeTodolistTitle = (title: string) => {
        props.ChangeTodolistTitle(title, props.id);
    };
    const onAllClickHandler = () => {
        props.changeFilter('ALL', props.id);
    };
    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.id);
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('Completed', props.id);
    };
    const RemoveTodoList = () => {
        props.removeTodoList(props.id);
    };

    return <div className="todoListContainer">
        <h3><EditableSpan ChangeTitle={ChangeTodolistTitle} title={props.title}/>
            <IconButton onClick={RemoveTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm callBack={(newTitle: string) => props.addTask(newTitle, props.id)}/>
        <ul style={{listStyle:'none',padding:'0px'}}>
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
                        <li  key={m.id}>
                            <span className={m.isDone ? 'isActive' : ''}>
                                <Checkbox
                                    size={'small'}
                                    color={'primary'}
                                    onChange={CheckingHandler}
                                    checked={m.isDone}/>
                                <EditableSpan ChangeTitle={ChangeTitleHandler} title={m.title}/>
                            </span>
                            <IconButton

                                    color={'secondary'}
                                    onClick={removeTaskHandler}>
                                    <Delete />
                            </IconButton>

                        </li>);
                })
            }

        </ul>
        <div>

            <Button
                variant={props.filter === 'ALL' ? 'contained' : 'outlined'}
                size={'small'}
                color={'primary'}
                onClick={onAllClickHandler}
            >ALL</Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                onClick={onCompletedClickHandler}>Completed</Button>

            {/*<button value={'Active'} changeFilter={props.changeFilter} filter={props.filter} id={props.id}/>
            <button value={'Completed'} changeFilter={props.changeFilter} filter={props.filter} id={props.id}/>*/}
            {/*<button value={'Completed'} className={props.filter==='Completed'?'activeFilter':''} onClick={()=> props.changeFilter('Completed',props.id)}>{props.value}</button>*/}


            {/*<button className={props.filter==='ALL'?'activeFilter':''} onClick={()=> props.changeFilter('ALL')}>All</button>
            <button className={props.filter==='Active'?'activeFilter':''} onClick={()=> props.changeFilter('Active')}>Active</button>
            <button className={props.filter==='Completed'?'activeFilter':''} onClick={()=> props.changeFilter('Completed')}>Completed</button>*/}
        </div>
    </div>;
}


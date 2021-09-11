import React, {useCallback} from 'react';
import {filterValuesType} from '../../AppWithRedux';
import {AddItemForm} from '../AddItemForm';
import {EditableSpan} from '../EditableSpan';
import {Box, Button, IconButton, List} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    addTask: (newTitle: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
    ChangeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
    changeFilter: (todolistId: string, filterValue: filterValuesType) => void
    filter: filterValuesType
    removeTodoList: (todolistId: string) => void
    ChangeTaskTitle: (id: string, title: string, todolistId: string) => void
    ChangeTodolistTitle: (title: string, todoListID: string) => void
}

export const Todolist: React.FC<PropsType> = React.memo(({
                                                             id,
                                                             ChangeTodolistTitle,
                                                             changeFilter,
                                                             removeTodoList,
                                                             addTask,
                                                             filter,
                                                             title,
                                                             ChangeStatusTask,
                                                             ChangeTaskTitle,
                                                             removeTasks
                                                         }) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);
    console.log('todolist');
    const ChangeTodolistTitleCallback = useCallback((title: string) => {
        ChangeTodolistTitle(id, title);
    }, [ChangeTodolistTitle, id]);
    const onAllClickHandler = useCallback(() => {
        changeFilter(id, 'ALL');
    }, [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => {
        changeFilter(id, 'Active');
    }, [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => {
        changeFilter(id, 'Completed');
    }, [changeFilter, id]);
    const RemoveTodoList = useCallback(() => {
        removeTodoList(id);
    }, [removeTodoList,id]);
    const AddTask = useCallback((newTitle: string) => {
        addTask(newTitle, id);
    }, [addTask,id]);

    let tasksForTodolist = tasks;
    if (filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(f => !f.isDone);

    }
    if (filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(f => f.isDone);
    }

    return <div className="todoListContainer">

        <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <EditableSpan
                ChangeTitle={ChangeTodolistTitleCallback} title={title}/>
            <IconButton size={'small'}
                        onClick={RemoveTodoList}>
                <Delete style={{fontSize: 25, margin: 10}}/>
            </IconButton>
        </h3>
        <AddItemForm callBack={AddTask}/>
        <List dense={true}>
            {
                tasksForTodolist.map((m) => <Task
                    key={m.id}
                    ChangeTaskTitle={ChangeTaskTitle}
                    ChangeStatusTask={ChangeStatusTask}
                    removeTasks={removeTasks}
                    id={id}
                    task={m}
                    addTask={addTask}
                />)
            }

        </List>
        <Box style={{display: 'flex', justifyContent: 'space-between'}}>

            <Button
                variant={filter === 'ALL' ? 'contained' : 'outlined'}
                size={'small'}
                color={'primary'}
                onClick={onAllClickHandler}
            >ALL</Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={filter === 'Active' ? 'contained' : 'outlined'}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={filter === 'Completed' ? 'contained' : 'outlined'}
                onClick={onCompletedClickHandler}>Completed</Button>
        </Box>

    </div>;
});





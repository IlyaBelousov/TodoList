import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './components/todolist/Todolist';
import Input from './components/Input';


export type keyType = 'ALL' | 'Active' | 'Completed'
type TodoListType = {
    id: string
    title: string
    filter: keyType
}

function App() {

    let todoListID_1 = v1();
    let todoListID_2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListID_1,
            title: 'What to learn?',
            filter: 'ALL'
        },

        {
            id: todoListID_2,
            title: 'What to buy?',
            filter: 'ALL'
        }
    ]);



    let [allTasks, setAllTasks] = useState({
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false}
        ]
    });
    const removeTodoList = (todolistId: string) => {
        todoLists=todoLists.filter(f=>f.id!==todolistId)
        setTodoLists([...todoLists])
        delete allTasks[todolistId]
    };


    const addTask = (newTitle: string, todolistId: string) => {
        let newTask = {id: todolistId, title: newTitle, isDone: false};
        let tasks = allTasks[todolistId];
        let newTasks = [newTask, ...tasks];
        allTasks[todolistId] = newTasks;
        setAllTasks({...allTasks});
    };
    const addTodoList=(title:string)=>{
        let newTodoList:TodoListType= {id: v1(), title: 'What to learn?', filter: 'ALL'}
        todoLists.push(newTodoList)
        setTodoLists([...todoLists])
    }


    const removeTasks = (id: string, todolistId: string) => {
        let tasks = allTasks[todolistId];
        tasks = tasks.filter(f => f.id !== id);
        allTasks[todolistId] = tasks;
        setAllTasks(allTasks);


    };
    const changeFilter = (key: keyType, todolistId: string) => {
        let todolist = todoLists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = key;
            setTodoLists([...todoLists]);
        }

    };


    const ChangeStatusTask = (id: string, isDone: boolean, todolistId: string) => {
        let currentTask = allTasks[todolistId].find(task => task.id === id);
        if (currentTask) {
            currentTask.isDone = isDone;
            setAllTasks({...allTasks});
        }
    };

    return (
        <div className="App">

            {
                todoLists.map(tl => {
                        let tasksForTodolist = allTasks[tl.id];
                        if (tl.filter === 'Active') {
                            tasksForTodolist = tasksForTodolist.filter(f => !f.isDone);

                        }
                        if (tl.filter === 'Completed') {
                            tasksForTodolist = tasksForTodolist.filter(f => f.isDone);
                        }
                        return <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            addTask={addTask}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            ChangeStatusTask={ChangeStatusTask}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                        />;
                    }
                )
            }
        </div>
    );
}

export default App;

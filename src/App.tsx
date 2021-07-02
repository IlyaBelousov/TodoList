import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './components/todolist/Todolist';
import {AddItemForm} from './components/AddItemForm';


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
            {id: v1(), title: 'CSS', isDone: true},
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
        todoLists = todoLists.filter(f => f.id !== todolistId);
        setTodoLists([...todoLists]);
        delete allTasks[todolistId];
    };


    const addTask = (newTitle: string, todolistId: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        allTasks[todolistId] = [newTask, ...allTasks[todolistId]];
        setAllTasks({...allTasks});
    };


    const removeTasks = (id: string, todolistId: string) => {
        allTasks[todolistId] = allTasks[todolistId].filter(f => f.id !== id);
        setAllTasks({...allTasks});


    };
    const changeFilter = (key: keyType, todolistId: string) => {
        let todolist = todoLists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = key;
            setTodoLists([...todoLists]);
        }

    };
    const ChangeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        allTasks[todolistId] = allTasks[todolistId].map(t => {
            if (t.id === id) {
                return {...t, isDone};
            }
            return t;
        });
        setAllTasks({...allTasks});

    };
    const ChangeTaskTitle = (id: string, title: string, todolistId: string) => {
        allTasks[todolistId] = allTasks[todolistId].map(t => {
            if (t.id === id) {
                return {...t, title};
            }
            return t;
        });
        setAllTasks({...allTasks});

    };
    const AddTodoList = (newTitle: string) => {
        const newTodolist: TodoListType = {
            id: v1(),
            title: newTitle,
            filter: 'ALL'
        };
        setTodoLists([...todoLists, newTodolist]);
        setAllTasks({...allTasks, [newTodolist.id]: []});
    };
    const ChangeTodolistTitle = (title:string,todoListID:string) => {
       setTodoLists(todoLists.map(tl=>{
           if(tl.id===todoListID){
               return {...tl,title:title}
           }
           return tl
       }))
    };

    return (
        <div className="App">
            <AddItemForm callBack={AddTodoList}/>
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
                            ChangeStatusTask={ChangeTaskStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            ChangeTaskTitle={ChangeTaskTitle}
                            ChangeTodolistTitle={ChangeTodolistTitle}
                        />;
                    }
                )
            }
        </div>
    );
}

export default App;

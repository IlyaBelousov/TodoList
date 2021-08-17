import {v1} from 'uuid';
import {TodoListType} from '../AppWithRedux';
import {
    TodolistReducer,
    RemoveTodolistAC,
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC
} from './todolist-reducer';

test('testing remove todolist', () => {
    let todolist1 = v1();
    let todolist2 = v1();
    const startState: Array<TodoListType> = [
        {
            id: todolist1,
            title: 'What to learn?',
            filter: 'ALL'
        },

        {
            id: todolist2,
            title: 'What to buy?',
            filter: 'ALL'
        }
    ];
    const endState = TodolistReducer(startState, RemoveTodolistAC(todolist1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolist2);
});
test('testing add todolist', () => {
    let todolist1 = v1();
    let todolist2 = v1();
    let newTodolistTitle = 'NewTitle';
    const startState: Array<TodoListType> = [
        {
            id: todolist1,
            title: 'What to learn?',
            filter: 'ALL'
        },

        {
            id: todolist2,
            title: 'What to buy?',
            filter: 'ALL'
        }
    ];
    const endState = TodolistReducer(startState,AddTodolistAC(newTodolistTitle));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('testing change todolist filter', () => {
        let todolist1 = v1();
        let todolist2 = v1();

        const startState: Array<TodoListType> = [
            {
                id: todolist1,
                title: 'What to learn?',
                filter: 'ALL'
            },

            {
                id: todolist2,
                title: 'What to buy?',
                filter: 'ALL'
            }
        ];
        const endState = TodolistReducer(startState, ChangeFilterAC(todolist2,'Active'));
        expect(endState.length).toBe(2);
        expect(endState[1].filter).toBe('Active');

    }
);
test('testing change todolist title', () => {
        let todolist1 = v1();
        let todolist2 = v1();
        let newTitle = 'New Title';
        const startState: Array<TodoListType> = [
            {
                id: todolist1,
                title: 'What to learn?',
                filter: 'ALL'
            },

            {
                id: todolist2,
                title: 'What to buy?',
                filter: 'ALL'
            }
        ];
        const endState = TodolistReducer(startState, ChangeTodolistTitleAC(todolist2,newTitle));
        expect(endState.length).toBe(2);
        expect(endState[1].title).toBe('New Title');
    }
);
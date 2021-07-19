import {userReducer} from './user-reducer';

test('reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});
    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});
test('reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});
test('reducer should change name', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
    let newName = 'Ilya';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', name: newName});
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);
    expect(endState.name).toBe('Ilya');
});
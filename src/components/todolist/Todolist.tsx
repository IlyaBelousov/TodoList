import React from 'react';
import {TodolistPropsType} from '../../App';



export const Todolist = (props:TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].title}</span></li>
                <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>
                <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};


import React from 'react';
import {keyType} from '../App';

type PropsType={
    changeFilter:(key: keyType, todolistId:string)=>void
    value:keyType
    filter:keyType
    id:string
}
const Button = (props:PropsType) => {

    return (

        <button className={props.filter===props.value?'activeFilter':''} onClick={()=> props.changeFilter(props.value,props.id)}>{props.value}</button>

    );
};

export default Button;
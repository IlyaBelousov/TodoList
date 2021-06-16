import React from 'react';
import {keyType} from '../App';

type PropsType={
    changeFilter:(key: keyType)=>void
    value:keyType
    filter:keyType
}
const Button = (props:PropsType) => {

    return (

        <button className={props.filter===props.value?'activeFilter':''} onClick={()=> props.changeFilter(props.value)}>{props.value}</button>

    );
};

export default Button;
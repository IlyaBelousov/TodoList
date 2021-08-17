import React from 'react';
import {filterValuesType} from '../AppWithRedux';

type PropsType={
    changeFilter:(key: filterValuesType, todolistId:string)=>void
    value:filterValuesType
    filter:filterValuesType
    id:string
}
const Button = (props:PropsType) => {

    return (

        <button className={props.filter===props.value?'activeFilter':''} onClick={()=> props.changeFilter(props.value,props.id)}>{props.value}</button>

    );
};


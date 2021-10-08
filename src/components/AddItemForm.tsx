import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {RequestStatusType} from "../state/app-reducer";

type inputType = {
    callBack: (newTitle: string) => void
    variant?: |'standard' | 'filled' | 'outlined' | undefined
    entityStatus?:RequestStatusType
}
export const AddItemForm = React.memo((props: inputType) => {
    console.log('add form');
    let [title, setTitle] = useState('');
    let [error, setError] = useState<boolean>(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setTitle(event.currentTarget.value);
    };
    const AddItem =() => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.callBack(trimmedTitle);
            setTitle('');
        } else {
            setError(true);
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setError(false);
            AddItem();
        }
    };
    const offMode = () => {
        setError(false);
    };
    return (
        <div>
            <TextField
                disabled={props.entityStatus==='loading'}
                size={'small'}
                onBlur={offMode}
                variant={props.variant?props.variant:'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                error={error}
                helperText={error && 'Title is required'}
            />
            <IconButton
                disabled={props.entityStatus==='loading'}
                style={{margin: '1'}}
                size={'medium'}
                onBlur={offMode}
                color={'primary'}
                onClick={AddItem}>
                <AddBox fontSize={'medium'}/>
            </IconButton>
        </div>
    );
});
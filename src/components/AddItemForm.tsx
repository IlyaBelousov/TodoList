import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import React, {KeyboardEvent, ChangeEvent, useState} from 'react';

type inputType = {
    callBack: (newTitle: string) => void
}
export const AddItemForm = (props: inputType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<boolean>(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setTitle(event.currentTarget.value);
    };
    const AddItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.callBack(trimmedTitle);

            setTitle('');
        } else {
            setError(true);
        }


    };
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
                onBlur={offMode}
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                error={error}
                helperText={error && 'Title is reqired'}
            />
            {/*<input
                className={error ? 'error' : 'inputClass'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />*/}
            <IconButton
                onBlur={offMode}
                color={'primary'}
                onClick={AddItem}>
                <AddBox/>
            </IconButton>

            {/*{error && <div className={'errorMessage'}>{error}</div>}*/}
        </div>
    );
};
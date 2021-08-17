import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';

type EditableSpanType = {
    title: string
    ChangeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('Editaple span');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    },[])
    const onKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.ChangeTitle(title);
            setEditMode(false);
        }
    },[props.ChangeTitle])
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        props.ChangeTitle(title);
        setEditMode(false);
    }
    return (
        editMode
            ? <TextField
                autoFocus
                onBlur={offEditMode}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
});


import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    ChangeTitle:(title:string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.ChangeTitle(title)
            setEditMode(false);
        }
    };
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        props.ChangeTitle(title)
        setEditMode(false);
    }
    return (
        editMode
            ?<TextField
                autoFocus
                onBlur={offEditMode}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            /*? <input autoFocus
                     onBlur={offEditMode}
                     value={title}
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPressHandler}/>*/
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}


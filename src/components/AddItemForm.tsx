import React, {KeyboardEvent, ChangeEvent, useState} from 'react';

type inputType = {
    callBack: (newTitle: string) => void
}
export const AddItemForm = (props: inputType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<null | string>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(event.currentTarget.value);
    };
    const AddItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.callBack(trimmedTitle);

            setTitle('');
        } else {
            setError('Title is required');
        }


    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setError(null);
            AddItem();
        }
    };
    return (
        <div>
            <input

                className={error ? 'error' : 'inputClass'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={AddItem}>+</button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    );
};
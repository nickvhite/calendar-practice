import React from 'react';
import AuthInput from '../AuthInput';

const AuthPasswordInput = ({id, value, setValue, visible, togglePass, error}) => {
    return (
        <AuthInput
            type={visible ? 'text' : 'password'}
            id={id}
            value={value}
            setValue={setValue}
            error={error}
        >
            {visible ?
                <i className="fas fa-eye-slash" onClick={() => togglePass()}/> :
                <i className="fas fa-eye" onClick={() => togglePass()}/>
            }
        </AuthInput>
    )
};

export default AuthPasswordInput;
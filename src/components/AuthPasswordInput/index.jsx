import React from 'react';
import AuthInput from '../AuthInput';
import styled from 'styled-components';

const EyeIcon = styled.i`
  position: absolute;
  right: 0;
  width: 30px;
  text-align: center;
  height: 30px;
  line-height: 30px!important;
  cursor: pointer;
`;

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
                <EyeIcon className="fas fa-eye-slash" onClick={() => togglePass()}/> :
                <EyeIcon className="fas fa-eye" onClick={() => togglePass()}/>
            }
        </AuthInput>
    )
};

export default AuthPasswordInput;
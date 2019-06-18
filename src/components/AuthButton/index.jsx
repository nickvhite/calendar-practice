import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    border: none;
    width: 150px;
    height: 50px;
    border-radius: 3px;
    font-weight: 600;
    color: white;
    margin-left: 105px;
    margin-top: 50px;
    cursor: pointer;
    outline: none;
    background: rgba(0, 108, 255, 0.8);

    &:hover {
      background: rgba(0, 108, 255, 0.6);
    }

    &:active {
      background: rgba(0, 108, 255, 1);
    }
`;

const AuthButton = ({value, send}) => {
    return (
        <Button
            type="submit"
            onClick={e => {
                e.preventDefault();
                send();
            }}
        >{value}</Button>
    )
};

export default AuthButton;

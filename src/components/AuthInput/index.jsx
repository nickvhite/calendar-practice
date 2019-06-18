import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  height: 30px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 0 5px;
  border-bottom: 1px solid black;
  background: ${props => props.error ? 'rgba(255, 0, 0, 0.15)' : ''};
  
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width .3s;
  }

  &:focus,
  &:valid {
    background: ${props => props.error ? 'rgba(255, 0, 0, 0.15)' : 'rgba(0, 108, 255, 0.15)'};

    &::after {
      width: 100%;
    }

    + label {
      margin-top: -25px;
      font-size: 16px;
      margin-left: 0;
    }
  }
`;

const Label = styled.label`
  position: absolute;
  font-size: 22px;
  transition: all 0.3s;
  text-transform: capitalize;
  margin-left: 10px;
`;

const ErrorContainer = styled.p`
  position: absolute;
  width: 100%;
  margin-top: 30px;
  color: red;
  display: flex;
  align-items: center;
`;

const ErrorIcon = styled.i`
  position: relative;
  height: 100%;
  display: inline-block;
  font-size: 14px;
`;

const ErrorText = styled.span`
  font-size: 12px;
  margin-left: 10px;
`;

const AuthInput = ({id, value, setValue, type, children, error}) => {
    return (
        <InputContainer error={error}>
            <Input
                error={error}
                required id={id}
                value={value}
                type={type}
                onChange={e => setValue(e.target.value)}
            />
            <Label htmlFor={id}>{id}</Label>
            {children}
            {error ? (
                <ErrorContainer>
                    <ErrorIcon className="fas fa-exclamation" />
                    <ErrorText>{error}</ErrorText>
                </ErrorContainer>
            ) : null}
        </InputContainer>
    )
};

export default AuthInput;
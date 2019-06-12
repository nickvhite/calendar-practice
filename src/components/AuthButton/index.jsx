import React from 'react';

const AuthButton = ({value, send}) => {
    return (
        <button
            type="submit"
            className='auth-button'
            onClick={e => {
                e.preventDefault();
                send();
            }}
        >{value}</button>
    )
};

export default AuthButton;

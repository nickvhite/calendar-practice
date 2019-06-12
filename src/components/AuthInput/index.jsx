import React from 'react';

const AuthInput = ({id, value, setValue, type, children, error}) => {
    return (
        <div className={`input-container ${error ? 'error' : ''}`}>
            <input required id={id} value={value} type={type} onChange={e => setValue(e.target.value)} />
            <label htmlFor={id}>{id}</label>
            {children}
            {error ? (
                <p className='error-input'>
                    <i className="fas fa-exclamation" />
                    <p>{error}</p>
                </p>
            ) : null}
        </div>
    )
};

export default AuthInput;
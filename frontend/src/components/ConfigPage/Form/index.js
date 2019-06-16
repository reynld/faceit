import React, { Component } from 'react';

const Form = (props) => {
    const { nickname, onChange, onSubmit } = props;
    return (
        <form onSubmit={onSubmit}>
            <h2>Faceit Nickname</h2>
            <input 
                name="nickname"
                value={nickname}
                onChange={onChange}
            />
            <button type="submit">submit</button>
            
        </form>
    );
}

export default Form;

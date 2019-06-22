import React, { Component } from 'react';

const Form = (props) => {
    const { nickname, onChange, onSubmit } = props;
    return (
        <form onSubmit={onSubmit}>
            <h2>Steps</h2>
            <ol>
                <li>Lookup Faceit nickname (CASE SENSITIVE)</li>
                <li>Set Faceit user</li>
            </ol>
            <input 
                name="nickname"
                value={nickname}
                onChange={onChange}
            />
            <button type="submit">Lookup Nickname</button>
        </form>
    );
}

export default Form;

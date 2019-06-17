import React, { Component } from 'react';

const Form = (props) => {
    const { nickname, onChange, onSubmit } = props;
    return (
        <form onSubmit={onSubmit}>
            <h2>Steps</h2>
            <ol>
                <li>check faceit nickname</li>
                <li>set faceit user</li>
            </ol>
            <input 
                name="nickname"
                value={nickname}
                onChange={onChange}
            />
            <button type="submit">Check Nickname</button>
        </form>
    );
}

export default Form;

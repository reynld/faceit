import React, { Component } from 'react';
import Player from './Player';

class Team extends Component {
    render() {
        const { right, roster } = this.props;
        console.log(roster);
        return (
            <div>
            {
                roster.map((player, i) => 
                    <Player key={i} right={right} player={player}/>
                )
            }
            </div>
        );
    }
}

export default Team;

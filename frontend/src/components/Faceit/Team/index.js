import React, { Component } from 'react';
import Player from './Player';
import './index.css'

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamAverage: null
        }
        this.getTeamAverage = this.getTeamAverage.bind(this)
    }


    getTeamAverage() {
        const { teamElo = {} } = this.props;
        const userIds = Object.keys(teamElo);
        if (userIds.length && this.state.teamAverage === null) {
            const avg = userIds.reduce((a, b) => {
                return a + teamElo[b]
            }, 0) / userIds.length;
            if (!isNaN(avg)){
                this.setState(() => ({teamAverage: Math.ceil(avg)}))
            }
        }
    }

    render() {
        const { right, roster, addUserElo, teamId} = this.props;
        this.getTeamAverage()
        return (
            <div className="team-container">
                <div className="team-avg">
                    {this.state.teamAverage}
                </div>
            {
                roster.map((player, i) => 
                    <Player 
                        key={i} 
                        right={right} 
                        player={player} 
                        addUserElo={addUserElo} 
                        teamId={teamId}
                    />
                )
            }
            </div>
        );
    }
}

export default Team;

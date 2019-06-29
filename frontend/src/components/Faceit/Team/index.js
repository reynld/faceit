import React, { Component } from 'react';
import Player from './Player';

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamAverage: 0
        }
    }

    componentDidUpdate() {
        this.getTeamAverage();
    }


    getTeamAverage = () => {
        const { teamElo = {}, setTeamElo, teamId } = this.props;
        const userIds = Object.keys(teamElo);

        if (userIds.length && this.state.teamAverage === 0) {
            const avg = userIds.reduce((a, b) => {
                return a + teamElo[b]
            }, 0) / userIds.length;
            if (!isNaN(avg)){
                this.setState({teamAverage: Math.ceil(avg)})
                setTeamElo(teamId, Math.ceil(avg))
            }
        }
    }

    renderTeamAverage = () => {
        const { teamDifference } = this.props;
        const positive = teamDifference > 0;
        return (
            <div className="team-avg">
                { this.state.teamAverage }
                <span 
                    className={`team-difference ${positive ? "positive" : ""}`}
                >   
                    { positive ? "+" : "" }
                    { teamDifference }
                </span>
            </div>
        )
    }

    render() {
        const { right, roster, addUserElo, teamId} = this.props;
        return (
            <div className="team-container">
            { this.renderTeamAverage() }
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

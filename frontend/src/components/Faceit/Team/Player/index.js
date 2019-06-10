import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class Player extends Component {
    constructor(props) {
      super(props);
      this.state = {
        playerInfo: {},
      }
    }
    componentDidMount() {
        const { id } = this.props.player;
        const url = `https://api.faceit.com/core/v1/users/${id}`;

        axios.get(url).then(res => {
            this.setState({ playerInfo: res.data})
        })
    }
    render() {
        const { payload } = this.state.playerInfo;
        const { right, player } = this.props;

        return (
            <div className="player-container" style={right ? {flexDirection: "row-reverse"} : null }>
              <img src={payload && payload.avatar} className="player-avatar"/>
              <div 
                className="player-info"
                style={right ? {alignItems: "flex-end"} : null }
              >
                <h2>{ player.nickname }</h2>
                <span>ELO: {payload && payload.games.battalion.faceit_elo}</span>
              </div>
              <div 
                className="player-skill-level"
                style={right ? {left: "15px"} : null }
              >
                <span>{payload && payload.games.battalion.skill_level}</span>
              </div>
            </div>
        );
    }
}

export default Player;

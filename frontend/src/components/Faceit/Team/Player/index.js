import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class Player extends Component {
    constructor(props) {
      super(props);
      this.state = {
        playerInfo: {},
      }

      this.getLevelSvg = this.getLevelSvg.bind(this)
    }
    componentDidMount() {
        const { id } = this.props.player;
        const url = `https://api.faceit.com/core/v1/users/${id}`;

        axios.get(url).then(res => {
            this.setState({ playerInfo: res.data})
        })
    }

    getLevelSvg() {
      const { payload } = this.state.playerInfo;
      if (payload && payload.games && payload.games.battalion && payload.games.battalion.skill_level) {
        return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${payload.games.battalion.skill_level}_svg.svg`
      }
      
      return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${1}_svg.svg`
    }



    render() {
        const { payload } = this.state.playerInfo;
        const { right, player } = this.props;

        console.log(this.state)

        return (
            <a 
              className="player-container" 
              style={right ? {flexDirection: "row-reverse"} : null }
              href={"https://www.faceit.com/en/players/" + player.nickname}
              target="_blank"
            >
              {
                payload && payload.avatar
                  ? <img src={payload.avatar} className="player-avatar"/>
                  : <div className="player-avatar"/>
              }
              <div 
                className="player-info"
                style={right ? {alignItems: "flex-end"} : null }
              >
                <h2>{ player.nickname }</h2>
                <span>{payload && payload.games.battalion.faceit_elo}</span>
              </div>
              <div 
                className="player-skill-level"
                style={right ? {left: "15px"} : null }
              >
                <img src={this.getLevelSvg()} className="level-image"/>
              </div>
            </a>
        );
    }
}

export default Player;

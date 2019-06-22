import React, { Component } from 'react';
import axios from 'axios';

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
      console.log('ID', id)
      axios.get(url).then(res => {
          this.setState(() => ({ playerInfo: res.data}))
      })
    }

    getLevelSvg() {
      const { payload } = this.state.playerInfo;
      if (payload && payload.games && payload.games.battalion && payload.games.battalion.skill_level) {
        return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${payload.games.battalion.skill_level}_svg.svg`
      }
      
      return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${1}_svg.svg`
    }

    getUserElo() {
      const { payload } = this.state.playerInfo;
      console.log("PAYLOAD", payload)
      const { addUserElo, teamId } = this.props;
      
      if (payload) {
        addUserElo(teamId, payload.guid, payload.games.battalion.faceit_elo)
        return payload.games.battalion.faceit_elo
      }
    }



    render() {
        const { payload } = this.state.playerInfo;
        const { right, player } = this.props;

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
                <span>{this.getUserElo()}</span>
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

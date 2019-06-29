import React, { Component } from 'react';
import { getLevelSvg, getPlayerInfoById } from '../../../../util/helpers'

class Player extends Component {

    constructor(props) {
      super(props);
      this.state = {
        playerInfo: {},
      }
    }

    componentDidMount() {
      this.loadPlayer();
    }

    loadPlayer = async () => {
      const { id } = this.props.player;
      const playerInfo = await getPlayerInfoById(id);
      this.setState({ playerInfo }, () => {
        const { payload } = this.state.playerInfo;
        const { addUserElo, teamId } = this.props;
        addUserElo(teamId, payload.guid, payload.games.battalion.faceit_elo)
      })
    }

    renderAvatar = (avatar) => {
      return avatar
        ? <img src={avatar} className="player-avatar"/>
        : <div className="player-avatar"/>
    }

    render() {
      const { right } = this.props;
      const { payload } = this.state.playerInfo || {};
      const {
        avatar = '',
        nickname = '',
        games: {
          battalion: {
            faceit_elo = 0,
            skill_level = 0,
          } = {},
        } = {},
      } = payload || {}

      return (
        <a 
          className="player-container" 
          style={right ? {flexDirection: "row-reverse"} : null }
          href={"https://www.faceit.com/en/players/" + nickname}
          target="_blank"
        >
          {this.renderAvatar(avatar)}
          <div 
            className="player-info"
            style={right ? {alignItems: "flex-end"} : null }
          >
            <h2>{ nickname }</h2>
            <span>{faceit_elo}</span>
          </div>
          <div 
            className="player-skill-level"
            style={right ? {left: "15px"} : null }
          >
            <img src={getLevelSvg(skill_level)} className="level-image"/>
          </div>
        </a>
      );
    }
}

export default Player;

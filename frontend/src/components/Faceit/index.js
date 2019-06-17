import React, { Component } from "react";
import Team from "./Team";

import "./index.css";
import axios from "axios";
import Player from "./Player";

class Faceit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inMatch: false,
      matchData: {},
      userInfo: {},
      teamElo: {},
    };

    this.addUserElo = this.addUserElo.bind(this)
    this.setTeamElo = this.setTeamElo.bind(this)
    this.getTeamDifference = this.getTeamDifference.bind(this)
  }

  componentDidMount() {
    this.getUserInfo();
  }
  
  getUserInfo() {
    const { nickname } = this.props;
    const url = `https://api.faceit.com/core/v1/nicknames/${nickname}`
    axios.get(url).then(res => {
      const { guid } = res.data.payload;
      this.setState(() => ({userInfo: res.data.payload}))
      axios.get(`https://api.faceit.com/match/v1/matches/groupByState?userId=${guid}`)
      .then(res => {
        if (res.data.payload.ONGOING) {
          this.setState(() => ({matchData: res.data.payload.ONGOING[0], inMatch: true}))
        } else {
          this.setState(() => ({matchData: {}, inMatch: false}))
        }
      })
    })
  }

  addUserElo(teamId, userId, elo) {
    this.setState(prevState => {
      let teamElo = Object.assign({}, prevState.teamElo);
      if (!teamElo[teamId]) {
        teamElo[teamId] = {}
      }
      if (!teamElo[teamId][userId]) {
        teamElo[teamId][userId] = elo;
        return {teamElo}
      }
    })
  }

  getTeamElo(num) {
    const { matchData } = this.state;
    if (num === 1 && this.state.teamElo[matchData.teams.faction1.id]) {
      const team = this.state.teamElo[matchData.teams.faction1.id];
      const userIds = Object.keys(team);
      if (userIds.length == 5) {
        return team
      }
    }

    if (num === 2 && this.state.teamElo[matchData.teams.faction2.id]) {
      const team = this.state.teamElo[matchData.teams.faction2.id];
      const userIds = Object.keys(team);
      if (userIds.length == 5) {
        return team
      }
    }

    return {};
  }

  setTeamElo(teamId, elo) {
    this.setState(() => ({[teamId]: elo}))
  }

  getTeamDifference(num) {
    const { matchData } = this.state;
    const team1 = matchData.teams.faction1.id
    const team2 = matchData.teams.faction2.id

    if (num === 1) {
      return this.state[team1] - this.state[team2] || 0
    }
    
    if (num === 2) {
      return this.state[team2] - this.state[team1] || 0
    }
  }

  render() {
    const { matchData, inMatch } = this.state;
    return (
      <div className="main-container">
      {
        inMatch
          ? (
            <div className="match-container">
              <Team 
                teamId={matchData.teams.faction1.id}
                roster={matchData.teams.faction1.roster} 
                addUserElo={this.addUserElo}
                teamElo={this.getTeamElo(1)}
                setTeamElo={this.setTeamElo}
                teamDifference={this.getTeamDifference(1)}
                />
              <span className="vs-middle">VS</span>
              <Team 
                teamId={matchData.teams.faction2.id}
                roster={matchData.teams.faction2.roster} 
                right={true} 
                addUserElo={this.addUserElo} 
                teamElo={this.getTeamElo(2)}
                setTeamElo={this.setTeamElo}
                teamDifference={this.getTeamDifference(2)}
              />
            </div>
          ) : (
            <div className="not-in-a-match">
              <span>Not currently in match</span>
              {
                this.state.userInfo.nickname &&
                  <Player userInfo={this.state.userInfo}/>
              }
            </div>
          )
      }
      </div>
    )
  }
}

export default Faceit;

import React, { Component } from "react";
import Team from "./Team";

import "./index.css";
import axios from "axios";

class Faceit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inMatch: false,
      matchData: {},
      userInfo: {},
    };
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

  render() {
    const { matchData, inMatch } = this.state;
    console.log('STATE', this.state)
    return (
      <div className="main-container">
      {
        inMatch
          ? (
            <React.Fragment>
              <Team roster={matchData.teams.faction1.roster}/>
              <span className="vs-middle">VS</span>
              <Team roster={matchData.teams.faction2.roster} right={true} />
            </React.Fragment>
          ) : (
            <div className="not-in-a-match">
              Not currently in a match...
            </div>
          )
      }
      </div>
    )
  }
}

export default Faceit;

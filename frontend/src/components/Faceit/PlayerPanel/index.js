import React, { Component } from 'react';
import { getLevelSvg, getPlayerMatchHistory } from '../../../util/helpers'

class PlayerPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matchHistory: []
        }
    }

    componentDidMount() {
        this.getMatchHistory()
    }

    getMatchHistory = async () => {
        const { userInfo } = this.props
        const matchHistory = await getPlayerMatchHistory(userInfo.guid)
        this.setState({matchHistory})
    }

    renderMatchHistory = () => {
        const { matchHistory } = this.state;
        return (
            <div className="match-history">
            {
                matchHistory.map((result, i) => 
                    <div 
                        key={i} 
                        className={`result ${result === "W" ? "win" : "loss"}`}
                    >
                        {result}
                    </div>
                )
            }
            </div>
        )
    }

    render() {
        const { userInfo } = this.props
        const { matchHistory } = this.state;
        return (
            <div className="solo-container">
                <div className="solo-info-container">
                    <img className="solo-avatar" src={userInfo.avatar} />
                    <div className="solo-info">
                        <h2>{userInfo.nickname}</h2>
                        <img src={getLevelSvg(userInfo.battalion_skill_level)} className="level-image"/>
                        <span className="elo">{userInfo.games.battalion.faceit_elo}</span>
                    </div>
                </div>
                { matchHistory.length > 0 && this.renderMatchHistory()}
            </div>
        );
    }
}

export default PlayerPanel;

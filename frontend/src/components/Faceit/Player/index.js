import React, { Component } from 'react';
import './index.css';

class Player extends Component {

    componentDidMount() {

    }

    getMatchHistory() {
        const matches = ['L', 'L', 'W', 'W', 'W']
        return matches.map((l, i) => (
            <div 
                className={
                    `result ${l == 'L' ? 'loss' : l == 'W' ? 'win' : 'tie'}`
                } 
                key={i}
            >{l}</div>
        ))
    }

    render() {
        const getLevelSvg = (lvl) => {
            return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${lvl}_svg.svg`
        }
        const { userInfo } = this.props
        // console.log('USER-INFO', userInfo)
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
                {/* <div className="match-history">
                    {this.getMatchHistory()}
                </div> */}
            </div>
        );
    }
}

export default Player;

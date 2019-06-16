import React, { Component } from 'react';

class Player extends Component {

    render() {
        const getLevelSvg = (lvl) => {
            return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${lvl}_svg.svg`
        }
        const { userInfo } = this.props
        console.log('USER-INFO', userInfo)
        return (
            <div>
                <img src={userInfo.avatar} />
                <h2>{userInfo.nickname}</h2>
                <img src={getLevelSvg(userInfo.battalion_skill_level)} className="level-image"/>
                <span>{userInfo.games.battalion.faceit_elo}</span>
            </div>
        );
    }
}

export default Player;

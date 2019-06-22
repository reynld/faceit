import React from 'react'
import axios from 'axios'
import Authentication from '../../util/Authentication/Authentication'

import Form from './Form';

export default class ConfigPage extends React.Component{
    constructor(props){
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            theme:'light',
            nickname: '',
            userInfo: {},
            invalidNickname: false,
            hasSetName: false,
        }

        this.saveConfig = this.saveConfig.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getLevelSvg = this.getLevelSvg.bind(this)
        this.setUserInfo = this.setUserInfo.bind(this)
    }

    contextUpdate(context, delta){
        if(delta.includes('theme')){
            this.setState(()=>{
                return {theme:context.theme}
            })
        }
    }

    componentDidMount(){
        // do config page setup as needed here
        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)
                if(!this.state.finishedLoading){
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.
    
                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(()=>{
                        return {finishedLoading:true}
                    })
                }
            })
    
            this.twitch.onContext((context,delta)=>{
                this.contextUpdate(context,delta)
            })

            this.twitch.configuration.onChanged(()=>{
                let config = this.twitch.configuration.broadcaster ? this.twitch.configuration.broadcaster.content : ""
                try{
                    config = JSON.parse(config)
                }catch(e){
                    console.error("Error: " + e)
                    config = ""
                }

                if (config.nickname) {
                    this.setState(()=>{
                        return{
                            nickname: config.nickname
                        }
                    })
                    this.setUserInfo(config.nickname)
                }
            })
        }

    }

    saveConfig(){
        const { nickname } = this.state.userInfo;
        this.twitch.configuration.set('broadcaster', '0.0.1', JSON.stringify({nickname}))
        this.setState({hasSetName: true})
    }

    onChange(e) {
        const name = e.target.getAttribute('name');
        const value = e.target.value;

        this.setState(() => ({[name]: value}))
    }

    onSubmit(e) {
        e.preventDefault();
        const { nickname } = this.state;
        this.setUserInfo(nickname)
    }

    setUserInfo(nickname) {
        const url = `https://api.faceit.com/core/v1/nicknames/${nickname}`
        axios.get(url).then(res => {
            const { data } = res;
            if (data.result === "ok" && data.payload.nickname === nickname) {
                this.setState({userInfo: data.payload, invalidNickname: false})
            } else {
                this.setState({userInfo: {}, invalidNickname: true})
            } 
        })
        .catch(err => {
            console.error("Error: " + err)
            this.setState({userInfo: {}, invalidNickname: true})
        });
    }

    getLevelSvg(lvl) {
        return `https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${lvl}_svg.svg`
    }

    render(){
        if(this.state.finishedLoading && this.Authentication.isModerator()){

            const {
                nickname = "" ,
                avatar = "",
                battalion_skill_level = 0,
            } = this.state.userInfo || {}
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        <Form  
                            onSubmit={this.onSubmit}
                            nickname={this.state.nickname} 
                            onChange={this.onChange}
                        />
                            <div className="faceit-preview">
                                {
                                    avatar !== ""
                                        ? <img src={avatar} className="preview-avatar"/>
                                        : <span className="preview-avatar"></span>
                                }
                                <h2>{
                                    this.state.invalidNickname 
                                        ? "INVALID NICKNAME"
                                        : nickname || "nickname"
                                }</h2>
                                <img className="preview-level" src={this.getLevelSvg(battalion_skill_level)}/>
                                <button 
                                    type="button" 
                                    onClick={() => this.saveConfig(nickname)}
                                    disabled={nickname === ""}
                                >Set User</button>
                            {
                                this.state.hasSetName
                                ? (<React.Fragment>
                                    <div className="success-set">
                                        Successfully set name
                                    </div>
                                    <div className="success-enabled">
                                        Overlay now enabled
                                    </div>
                                </React.Fragment>)
                                : null
                            }
                            </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        Loading...
                    </div>
                </div>
            )
        }
    }
}
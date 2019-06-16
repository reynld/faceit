import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './Config.css'
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
        }

        this.saveConfig = this.saveConfig.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
                // console.log('AUTH', auth)
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
                // console.log('CONTEXT', context)
                // console.log('DELTA', delta)
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

                this.setState(()=>{
                    return{
                        nickname: config.nickname
                    }
                })
            })
        }
    }

    saveConfig(){
        this.twitch.configuration.set('broadcaster', '0.0.1', JSON.stringify({nickname}))
        this.setState(() => ({nickname}));
    }

    onChange(e) {
        const name = e.target.getAttribute('name');
        const value = e.target.value;

        this.setState(() => ({[name]: value}))
    }

    onSubmit(e) {
        e.preventDefault();
        const { nickname } = this.state;
        this.saveConfig(nickname)
    }

    render(){
        if(this.state.finishedLoading && this.Authentication.isModerator()){
            return(
                <div className="Config">
                    <div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        <Form  
                            onSubmit={this.onSubmit}
                            nickname={this.state.nickname} 
                            onChange={this.onChange}
                        />
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
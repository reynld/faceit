import React, { Component } from "react";
import Team from "./Team";

import "./index.css";

class Faceit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        {
          id: "32aaafce-e8e5-4c09-84ae-4e8c15094386",
          name: "team_Clasiclytrd1",
          type: "",
          avatar:
            "https://assets.faceit-cdn.net/avatars/32aaafce-e8e5-4c09-84ae-4e8c15094386_1559931288331.jpg",
          leader_id: "32aaafce-e8e5-4c09-84ae-4e8c15094386",
          co_leader_id: "",
          roster: [
            {
              id: "faa2685e-17a9-4070-bd13-04dc466d34ff",
              nickname: "ChrisRey",
              avatar:
                "https://assets.faceit-cdn.net/avatars/faa2685e-17a9-4070-bd13-04dc466d34ff_1559698915789.jpg",
              game_id: "76561198041082461",
              game_name: "ChrisRey",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            },
            {
              id: "32aaafce-e8e5-4c09-84ae-4e8c15094386",
              nickname: "Clasiclytrd1",
              avatar:
                "https://assets.faceit-cdn.net/avatars/32aaafce-e8e5-4c09-84ae-4e8c15094386_1559931288331.jpg",
              game_id: "76561198295767252",
              game_name: "Clasiclytrd1",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            },
            {
              id: "7dc970a0-4b18-49aa-bfd1-6d6e41a1ddcc",
              nickname: "CristoWall",
              avatar: "",
              game_id: "76561197971987064",
              game_name: "CristoWall",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            },
            {
              id: "cdbfa496-77a2-4f3e-b74a-7ce0d530f01e",
              nickname: "KURISUx",
              avatar: "",
              game_id: "76561198827864217",
              game_name: "KURISUx",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            },
            {
              id: "4497e6ba-f692-4113-91b4-45bcd1bf712f",
              nickname: "R34PZ",
              avatar: "",
              game_id: "76561198152052230",
              game_name: "R34PZ",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            }
          ],
          substitutions: 0,
          substitutes: null
        },
        {
          id: "0d095fe4-64d0-40b0-9d36-360e87fa9fff",
          name: "team_SkynoxYT",
          type: "",
          avatar: "",
          leader_id: "0d095fe4-64d0-40b0-9d36-360e87fa9fff",
          co_leader_id: "",
          roster: [
            {
              id: "dd978251-5ced-49a7-aa7b-13134596c51e",
              nickname: "Option412",
              avatar: "",
              game_id: "76561198120268574",
              game_name: "Option412",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            },
            {
              id: "c730032e-862b-4e64-b5de-e6fdaf9f4bf4",
              nickname: "Karnageb",
              avatar: "",
              game_id: "76561198810651347",
              game_name: "Karnageb",
              game_skill_level: 2,
              membership: "",
              anticheat_required: false
            },
            {
              id: "b86106ce-031c-4fad-8ac7-1b77520ffd42",
              nickname: "Jayt35",
              avatar: "",
              game_id: "76561198226169800",
              game_name: "Jayt35",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            },
            {
              id: "18bb9cc9-09d4-40ec-b40d-19a82fa5cb4b",
              nickname: "NaniMonster",
              avatar: "",
              game_id: "76561198229715688",
              game_name: "NaniMonster",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            },
            {
              id: "0d095fe4-64d0-40b0-9d36-360e87fa9fff",
              nickname: "SkynoxYT",
              avatar: "",
              game_id: "76561198018337422",
              game_name: "SkynoxYT",
              game_skill_level: 3,
              membership: "",
              anticheat_required: false
            }
          ],
          substitutions: 0,
          substitutes: null
        }
      ]
    };
  }
  render() {
    return (
      <div className="main-container">
        <Team roster={this.state.teams[0].roster}/>
        <span className="vs-middle">VS</span>
        <Team roster={this.state.teams[1].roster} right={true} />
      </div>
    );
  }
}

export default Faceit;

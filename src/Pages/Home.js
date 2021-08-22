import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

const CREATE_MATCH = gql`
mutation createMatch($T1Name: String!, $T2Name: String!, $PlayersPerTeam: Int!, $TankPickOrder: [String]!, $NoahsArkCount: Int!, $T1Logo: String!, $T2Logo: String!) {
  createMatch(team1Name: $T1Name, team2Name: $T2Name, playersPerTeam: $PlayersPerTeam, tankPickOrder: $TankPickOrder, noahsArkCount: $NoahsArkCount, team1Logo: $T1Logo, team2Logo: $T2Logo) {
    keys {
      team1
      team2
      admin
      spectate
    }
    teams {
      name
    }
  }
}
`
const Home = () => {
    const [createMatch] = useMutation(CREATE_MATCH)

    //form variables to generate match
    const [T1Name, setT1Name] = useState("Team 1")
    const [T2Name, setT2Name] = useState("Team 2")
    const [T1Logo, setT1Logo] = useState('https://cdn.discordapp.com/attachments/629193283091955733/769091738013925386/0reopbN.png')
    const [T2Logo, setT2Logo] = useState('https://cdn.discordapp.com/attachments/581953548666011661/768684847388426281/Bear_Force_One_Website.png')
    const PlayersPerTeam = 6
    const TankPickOrder = ["2A", "4D", "3A", "2D", "1A"]
    const NoahsArkCount = 2
    //generated keys
    const [T1Key, setT1Key] = useState("")
    const [T2Key, setT2Key] = useState("")
    const [SKey, setSKey] = useState("")
    const [AdminKey, setAdminKey] = useState("")
    const handleClick = async () => {
        try {
            const response = await createMatch({ variables: { T1Name, T2Name, PlayersPerTeam, TankPickOrder, NoahsArkCount, T1Logo, T2Logo } })
            setT1Key(`${window.location.href}team/${response.data.createMatch.keys.team1}`)
            setT2Key(`${window.location.href}team/${response.data.createMatch.keys.team2}`)
            setSKey(`${window.location.href}spectate/${response.data.createMatch.keys.spectate}`)
            setAdminKey(`${window.location.href}admin/${response.data.createMatch.keys.admin}`)
        } catch (e) {
            console.log(e.message)
        }

    }
    return (
        <div>
            <button onClick={handleClick}>create new test match</button>
            <table>
                <tbody>
                    <tr>
                        <th>Team 1 Key</th>
                        <th><a href={T1Key} target="_blank" rel="noreferrer">{T1Key}</a></th>
                    </tr>
                    <tr>
                        <th>Team 2 Key</th>
                        <th><a href={T2Key} target="_blank" rel="noreferrer" >{T2Key}</a></th>
                    </tr>
                    <tr>
                        <th>Spectator Key</th>
                        <th><a href={SKey} target="_blank" rel="noreferrer">{SKey}</a></th>
                    </tr>
                    <tr>
                        <th>Admin Key</th>
                        <th><a href={AdminKey} target="_blank" rel="noreferrer">{AdminKey}</a></th>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}

export default Home;

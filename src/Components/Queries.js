import { gql } from "@apollo/client"

export const GET_MATCH = gql`
    query OnGetMatch($userKey: String!) {
        getMatch(key: $userKey) {
        tankPicks {
            attack
            defense
        }
        format {
            playersPerTeam
            tankPickOrder
            noahsArkCount
        }
        teams {
            name
            side
            logo
        }
        keys {
            team1
            team2
        }
        turn
  }
}
`
export const SUB_TO_MATCH = gql`
subscription Subscription ($userKey: String!) {
  matchUpdated(key: $userKey) {
    tankPicks {
            attack
            defense
        }
        format {
            playersPerTeam
            tankPickOrder
            noahsArkCount
        }
        teams {
            name
            side
            logo
        }
        keys {
            team1
            team2
        }
        turn
  }
}
`

export const PICK_TANKS = gql`
mutation OnPickTanks($userKey: String!, $TTA: [String]!) {
    pickTanks(key: $userKey, tanks: $TTA) 
}
`

export const RESET_ROUND = gql`
mutation AdminResetRoundMutation($userKey: String!, $switchSides: Boolean!) {
AdminResetRound(key: $userKey, switchSides: $switchSides)
}
`
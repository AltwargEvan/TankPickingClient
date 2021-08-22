import { useState, useEffect } from "react";
import { useSubscription, useQuery } from "@apollo/client";
import { GET_MATCH, SUB_TO_MATCH } from "./Queries";
import { useParams } from 'react-router-dom';

import Admin from "../Pages/Admin";
import Spectate from "../Pages/Spectate";

const MatchDataRouter = () => {
    const [match, setMatch] = useState(null)
    const userKey = useParams().key
    const userType = useParams().userType

    //query match  when page is first loaded
    const loadMatchData = useQuery(GET_MATCH, { variables: { userKey: userKey } }).data

    useEffect(() => {
        if (loadMatchData && loadMatchData.getMatch)
            setMatch(loadMatchData.getMatch)
    }, [loadMatchData]);

    const matchSubscription = useSubscription(SUB_TO_MATCH, { variables: { userKey: userKey } }).data

    useEffect(() => {
        if (matchSubscription && matchSubscription.matchUpdated) {
            setMatch(matchSubscription.matchUpdated)
        }
    }, [matchSubscription])

    if (!match) return 'Loading...'
    switch (userType) {
        case "admin":
            return <Admin match={match} userKey={userKey} />
        case "spectate":
            return <Spectate match={match} />
        default:
            return "fuck you retard stop putting random urls"
    }
}

export default MatchDataRouter
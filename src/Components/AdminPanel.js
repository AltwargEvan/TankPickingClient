import { useMutation } from "@apollo/client"
import { RESET_ROUND } from "./Queries"

const AdminPanel = ({ userKey }) => {
    const [resetRound] = useMutation(RESET_ROUND)

    const doResetRound = (switchSides) => {
        resetRound({ variables: { userKey, switchSides } })
    }

    return (
        <>
            <button onClick={() => doResetRound(false)} className="Admin-Reset1"><h2>RESET</h2></button>
            <button onClick={() => doResetRound(true)} className="Admin-Reset2"><h2>RESET AND SWITCH SIDES</h2></button>
        </>
    )
}

export default AdminPanel
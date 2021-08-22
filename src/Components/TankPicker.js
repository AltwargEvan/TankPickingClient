import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { PICK_TANKS } from "./Queries";

const TankPicker = ({ turnAmount, userKey }) => {
    console.log('key', userKey)
    const [TTA, setTTA] = useState([]) //tanks to add
    const [tank, setTank] = useState('')
    const addTank = () => {
        if (TTA.length < turnAmount) {
            setTTA(TTA.concat(tank))
            setTank('')
        }
    }

    const TankDisplay = ({ tank, index }) => {
        const rmTank = (index) => {
            if (TTA.length === 1) setTTA([])
            else {
                const newTTA = TTA.slice(0, index).concat(TTA.slice(index + 1))
                setTTA(newTTA)
            }
        }
        return (
            <div>
                <b>{tank}</b><button onClick={() => rmTank(index)}>X</button>
            </div>
        )
    }

    const handleInputChange = (event) => {
        setTank(event.target.value)
    }

    const [pickTanks] = useMutation(PICK_TANKS)
    const [err, setErr] = useState('')
    const doPickTanks = async () => {
        try {
            const result = await pickTanks({ variables: { userKey, TTA } })
            setErr(result.data.pickTanks)
            setTTA([])
        } catch (e){
            setErr(e.message)
        }
    }
    return (
        <>
            <h1>Tank Picker</h1>
            <div>
                <input type='text' value={tank} onChange={handleInputChange}></input> <button onClick={addTank}>Add</button>

            </div>
            <div>
                {TTA.map((tank, index) => <TankDisplay tank={tank} index={index} key={index} />)}
            </div>
            <button onClick={doPickTanks}><h2>Pick Tanks</h2></button>
            <div>
                <h3>{err}</h3>
            </div>
        </>
    )
}
export default TankPicker
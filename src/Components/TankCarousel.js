import React, { useState } from "react"
import { useMutation } from '@apollo/client';

import { Tanks } from '../Assets/data'
import { PICK_TANKS } from "./Queries";

const TankCarousel = ({ match, userKey }) => {
    const [tankClass, setTankClass] = useState('All')
    const handleButton = (role) => {
        if (tankClass === role) setTankClass('All')
        else setTankClass(role)
    }
    const [filter, setFilter] = useState('')
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const [TTA, setTTA] = useState([]) //tanks to add
    const [err, setErr] = useState('')


    const [pickTanks] = useMutation(PICK_TANKS)
    const doPickTanks = async () => {
        try {
            const result = await pickTanks({ variables: { userKey, TTA } })
            setErr(result.data.pickTanks)
            setTTA([])
        } catch (e) {
            setErr(e.message)
        }
    }
    const rmErr = () => {
        setErr('')
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
    return (
        <>
            <div className="Carousel" onClick={rmErr}>
                {Tanks.filter(tank => tank.label.toLowerCase().includes(filter.toLowerCase()) && (tankClass === 'All' || tank.class === tankClass)).map(tank => <button onClick={() => setTTA(TTA.concat(tank.label))}><h3>{tank.label}</h3></button>)}
            </div>
            <div className="Carousel-Filter" onClick={rmErr}>
                <button onClick={() => handleButton('Heavy')}>Heavy</button>
                <button onClick={() => handleButton('Medium')}>Medium</button>
                <button onClick={() => handleButton('Light')}>Light</button>
                <button onClick={() => handleButton('Tank Destroyer')}>Tank Destroyer</button>
                <button onClick={() => handleButton('Artillery')}>Artillery</button>
                <input type="text" value={filter} onChange={handleFilterChange}></input>
                {err}
            </div>
            <div className="Carousel-Selected">
                {TTA.map((tank, index) => <TankDisplay tank={tank} index={index} key={index} />)}
            </div>
            <button className="Pick-Tanks" onClick={doPickTanks}><h2>PICK TANKS</h2></button>
        </>
    )
}

export default TankCarousel
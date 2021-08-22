import React from "react"
import { Tanks } from "../Assets/data"
import '../Styles/tank_display.css'

const Tank = ({ tank, side }) => {
    const theTank = Tanks.find(t => t.label === tank)
    const imgSrc = theTank ? theTank.bgImg : 'https://mpng.subpng.com/20190730/hxu/kisspng-tank-silhouette-army-military-shoulder-t-shirt-tanksilhouettemechanicalwarfree-pictures-fre-5d3fd2e5ceded3.3049184715644638458474.jpg'
    return (
        <div className={side}>
            <div>
                <img className={`${side} img`} src={imgSrc}></img>
            </div>
        </div>
    )
}

const TankDisplay = ({ match, side }) => {
    const tanks = side === 'A' ? match.tankPicks.attack : match.tankPicks.defense
    const logo = match.teams[0].side === side ? match.teams[0].logo : match.teams[1].logo 
    console.log('logo', logo)
    return (
        <>
            <img className={`logo img`} src={logo}></img>
            <Tank side={side} tank={tanks[0]} />
            <Tank side={side} tank={tanks[1]} />
            <Tank side={side} tank={tanks[2]} />
            <Tank side={side} tank={tanks[3]} />
            <Tank side={side} tank={tanks[4]} />
            <Tank side={side} tank={tanks[5]} />
        </>
    )
}

export default TankDisplay
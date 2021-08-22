import React from "react"

//components
import TankDisplay from "../Components/TankDisplay"
//styles
import '../Styles/grid_spectate.css'
import '../Styles/fullscreendiv.css'

const Spectate = ({ match }) => {
    return (
        <div className="container-spectate">
            <div className="Spacer"></div>
            <TankDisplay className="Attack-Tanks" match={match} side={'A'} />
            <TankDisplay className="Defense-Tanks" match={match} side={'D'} />
            <div className="Spacer2"></div>
        </div>
    )
}

export default Spectate
import React from 'react'

// components
import AdminPanel from '../Components/AdminPanel'
import TankDisplay from '../Components/TankDisplay';
import TankCarousel from '../Components/TankCarousel';
import '../Styles/grid_admin.css'

const Admin = ({ match, userKey }) => {
    return (
        <>
            <div className="container-admin">
                <TankDisplay className="Attack-Tanks" match={match} side={'A'} />
                <TankDisplay className="Defense-Tanks" match={match} side={'D'} />
                <AdminPanel userKey={userKey} />
                <TankCarousel match={match} userKey={userKey}/>
            </div>
        </>

    )
}

export default Admin
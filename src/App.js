import React from "react";
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";

//pages
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import Spectate from "./Pages/Spectate";
import Admin from "./Pages/Admin";
import MatchDataRouter from "./Components/MatchDataRouter";

//global css
import "./Styles/global.css"
import './Styles/fullscreendiv.css'
import './Styles/background.css'

const App = () => {
    return (
        <>

            <div className='full-screen-div blur-bg'>
                <Router>
                    <Switch>
                        <Route path="/:userType/:key">
                            <MatchDataRouter />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch >
                </Router >
                <div class="blur"></div>
            </div>

        </>

    )
}

export default App;
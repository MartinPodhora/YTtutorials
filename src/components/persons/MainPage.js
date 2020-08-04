import React from 'react';
import Page404 from './Page404';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from './App';

function MainPage() {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch >
                    <Route exact path="/" component={App} />
                    <Route exact path="*" component={Page404} />
                </Switch>               
            </Router>
        </div>
    )
}

export default MainPage

import React from 'react';
import Page404 from './Page404';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from './App';
import LoginPage from './LoginPage';

function MainPage() {
    return (
        <div>
            <Router>
                <Switch >
                    <Route exact path="/MartinPodhora/YTtutorials.git" component={App} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="*" component={Page404} />
                </Switch>               
            </Router>
        </div>
    )
}

export default MainPage

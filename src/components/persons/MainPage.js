import React from 'react';
import Page404 from './Page404';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from './App';
import LoginPage from './LoginPage';
import GUI from '../garbage/GUI';
import UserInfo from './UserInfo';
import ComplexTable from './ComplexTable';

function MainPage() {
    return (
        <div>
            <Router>
                <Switch >
                    <Route exact path="/MartinPodhora/YTtutorials.git" component={App} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/gui" component={GUI} />
                    <Route exact path="/userInfo" component={UserInfo} />
                    <Route exact path="/table" component={ComplexTable} />
                    <Route exact path="*" component={Page404} />                  
                </Switch>               
            </Router>
        </div>
    )
}

export default MainPage

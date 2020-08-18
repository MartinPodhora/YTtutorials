import React, { createContext, useState} from 'react';
import Page404 from './Page404';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import App from './App';
import LoginPage from './LoginPage';
import GUI from '../garbage/GUI';
import UserInfo from './UserInfo';
import ComplexTable from './table/ComplexTable';
import ErrorLog from './ErrorLog';
import MultiSelect from "./MultiSelect"
import ErrorAlert from "./ErrorAlert"

export const ErrorList = createContext()

function MainPage() {
    const [errors, setErrors] = useState([])

    return (
        <div>
            <ErrorList.Provider value={[errors, setErrors]}>
                <Router>
                    <Switch >
                        <Route exact path="/MartinPodhora/YTtutorials.git" component={App} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/gui" component={GUI} />
                        <Route exact path="/userInfo" component={UserInfo} />
                        <Route exact path="/table" component={ComplexTable} />
                        <Route exact path="/ErrorLog" component={ErrorLog} />
                        <Route exact path="/MultiSelect" component={MultiSelect} />
                        <Route exact path="*" component={Page404} />                  
                    </Switch>               
                </Router>
                <ErrorAlert />
            </ErrorList.Provider>
        </div>
    )
}

export default MainPage

import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './login';
import Register from './register';
import CalendarContainer from './calendar';

import WithAuthCheck from '../hoc/with-auth-check'
import AuthLayOut from '../components/AuthLayOut';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <WithAuthCheck>
                    <Switch>
                        <Route path='/auth'>
                            <AuthLayOut>
                                <Route path='/auth/login' component={Login}/>
                                <Route path='/auth/register' component={Register}/>
                            </AuthLayOut>
                        </Route>
                    </Switch>
                    <Route path='/calendar' component={CalendarContainer}/>
                </WithAuthCheck>
            </BrowserRouter>
        )
    }
}
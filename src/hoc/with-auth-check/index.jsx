import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";

import UserService from '../../services/user-service';
import {setUserData} from "../../store/user";

const authRoutes = ['/auth/login', '/auth/register'];

class Index extends Component {
    constructor(props) {
        super(props);
    }

    async userDataToStore() {
        const userData = await UserService.getUserData();
        if (userData) {
            console.log(userData);
            await this.props.setUserData(userData);
        }
    }

    async componentWillMount() {
        await this.userDataToStore();
        await this.detectRedirectNeeded();
    }

    componentDidUpdate() {
        this.detectRedirectNeeded()
    }

    detectRedirectNeeded() {
        const {pathname} = this.props.history.location;
        const authenticated = !!this.props.user.loggedIn;
        if (authenticated && pathname !== '/calendar') {
            this.props.history.replace('/calendar');
        } else if (!authenticated && authRoutes.indexOf(pathname) < 0) {
            this.props.history.replace('/auth/login');
        }
    }

    render () {
        return this.props.children
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            user: state.user
        }),
        ({
            setUserData
        })
    )
)(Index);
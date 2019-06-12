import React, {Component} from 'react';
import {connect} from 'react-redux';

import {logoutUSer} from '../../store/user'

import UserService from '../../services/user-service';

class CalendarLayOut extends Component {
    constructor(props) {
        super(props);
    }

    logout() {
        UserService.logout();
        this.props.logoutUSer();
    }

    render() {
        return (
            <div className="general-layout">
                <div className='calendar-header'>
                    <button onClick={() => this.logout()}>Sign out</button>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    null,
    ({
        logoutUSer
    })
)(CalendarLayOut);

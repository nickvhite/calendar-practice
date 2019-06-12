import React, {Component} from 'react';
import {connect} from 'react-redux';

import {logoutUSer} from '../../store/user'

import UserService from '../../services/user-service';

const monthList = [
    'January',
    'February	',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

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
                    <div className="calendar-navigator">
                        <button className="navigation-button" onClick={() => this.props.prevMonth()}>
                            <i className="fas fa-chevron-left" />
                        </button>
                        <span>{monthList[this.props.month]}</span>
                        <button className="navigation-button" onClick={() => this.props.nextMonth()}>
                            <i className="fas fa-chevron-right" />
                        </button>
                    </div>
                    <button onClick={() => this.logout()}>Sign out</button>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    ({
        logoutUSer
    })
)(CalendarLayOut);

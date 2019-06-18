import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom'

import {logoutUSer} from '../../store/user'

import UserService from '../../services/user-service';
import dateFns from "date-fns";

import {Header, HeaderLink} from "../StyledComponents";

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
                <Header className='calendar-header'>
                    <div className='day-number-container'>
                        <i className="far fa-calendar" />
                        <p>{this.props.currentDay}</p>
                    </div>
                    <div className="calendar-navigator">
                        {/*<button className="navigation-button" onClick={() => this.props.prevMonth()}>*/}
                        {/*    <i className="fas fa-chevron-left" />*/}
                        {/*</button>*/}
                        {/*<button className="navigation-button" onClick={() => this.props.nextMonth()}>*/}
                        {/*    <i className="fas fa-chevron-right" />*/}
                        {/*</button>*/}
                        <span>{dateFns.format(this.props.currentMonth, 'MMMM YYYY')}</span>
                    </div>
                    <HeaderLink to='/' className='logout-button' onClick={() => this.logout()}>Sign out</HeaderLink>
                </Header>
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

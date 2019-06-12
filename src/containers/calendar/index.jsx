import React, {Component} from 'react';
import {connect} from 'react-redux';
import dateFns from "date-fns";

import {setEntities} from "../../store/entities";

import EntitieService from '../../services/entitie-service';

import CalendarLayOut from '../../components/CalendarLayOut';
import CalendarMonth from '../../components/CalendarMonth';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.user._id && this.props.user._id) {
            this.getEntites()
        }
    }

    getEntites() {
        EntitieService.getEntities(this.props.user._id)
            .then(resp => this.props.setEntities(resp))
            .catch(err => console.log(err));
    }

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return (
            <CalendarLayOut
                month={dateFns.getMonth(this.state.currentMonth)}
                nextMonth={() => this.nextMonth()}
                prevMonth={() => this.prevMonth()}
            >
                <CalendarMonth
                    currentMonth={this.state.currentMonth}
                    selectedDate={this.state.selectedDate}
                />
            </CalendarLayOut>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        entities: state.entities
    }),
    ({
        setEntities
    })
)(Calendar);
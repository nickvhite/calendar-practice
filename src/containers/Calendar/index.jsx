import React, {Component} from 'react';
import {connect} from 'react-redux';
import dateFns from "date-fns";

import {setEntities} from "../../store/entities";
import {openCreatingForm, closeCreatingFrom} from "../../store/eventForm";

import EntitieService from '../../services/entitie-service';

import CalendarLayOut from '../../components/CalendarLayOut';
import CalendarMonth from '../../components/CalendarMonth';
import CalendarWeek from '../../components/CalendarWeek';
import EventForm from '../EventForm';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            chooseDate: ''
        };
    }

    componentWillMount() {
        if (this.props.user._id) {
            this.getEntities();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.user._id && this.props.user._id) {
            this.getEntities();
        }
    }

    sortByDate(entities) {
        let sortedEntities = {};
        entities.map(entity => {
            const date = dateFns.format(entity.date, 'M/D/YY');
            sortedEntities[date] = sortedEntities[date] || [];
            sortedEntities[date].push(entity);
        });
        return sortedEntities;
    }

    setEntities(entities) {
        const sortedEntities = this.sortByDate(entities);
        this.props.setEntities(sortedEntities);
    }

    getEntities() {
        EntitieService.getEntities(this.props.user._id)
            .then(resp => this.setEntities(resp))
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

    getDataTime(path) {
        let date = '';
        for (let i = 0; i < path.length; i++) {
            if (path[i].dataset && path[i].dataset.date) {
                date = path[i].dataset.date;
                break;
            }
        }
        return date;
    }

    onCalendarClick(e) {
        const dataTime = this.getDataTime(e.nativeEvent.composedPath());
        this.setState({chooseDate: dataTime});
        if (e.nativeEvent.target.id !=='event-creator') {
            if (this.props.eventForm.creatingForm) {
                this.props.closeCreatingFrom();
            } else {
                this.props.openCreatingForm(dataTime);
            }
        }
    }

    render() {
        const {eventForm} = this.props;
        return (
            <CalendarLayOut
                currentDay={dateFns.format(this.state.currentMonth, 'D')}
                currentMonth={this.state.currentMonth}
                nextMonth={() => this.nextMonth()}
                prevMonth={() => this.prevMonth()}
            >
                <CalendarWeek />
                <CalendarMonth
                    currentMonth={this.state.currentMonth}
                    selectedDate={this.state.selectedDate}
                    onCalendarClick={(e) => this.onCalendarClick(e)}
                />
                {eventForm.creatingForm || eventForm.infoForm ? (
                    <EventForm
                        date={this.state.chooseDate}
                    />
                ) : null}
            </CalendarLayOut>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        entities: state.entities,
        eventForm: state.eventForm
    }),
    ({
        setEntities,
        openCreatingForm,
        closeCreatingFrom
    })
)(Calendar);
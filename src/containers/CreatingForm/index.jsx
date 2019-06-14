import React, {Component} from 'react';
import {connect} from 'react-redux'
import dateFns from "date-fns";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import {closeCreatingFrom, openCreatingForm} from "../../store/eventForm";
import {pushEntities} from '../../store/entities';

const eventTypes = [
    'event',
    'reminder',
    'task'
];

import EntitieService from '../../services/entitie-service';

class CreatingForm extends Component {
    constructor(props) {
        super(props);
        this.startDate = new Date(this.props.date);
        this.maxTime = dateFns.setHours(this.startDate, 23).setMinutes(30);
        this.state = {
            title: '',
            type: 'event',
            date: new Date(this.props.date),
            time: null,
            description: '',
            timePickerEnabled: false,
            hourDifference: 1,
            minuteDifference: 0,
        };
    }

    getEndTime() {
        const startHours = this.state.time.start.getHours();
        const startMinutes = this.state.time.start.getMinutes();
        let endHours = startHours + this.state.hourDifference;
        let endMinutes = startMinutes + this.state.minuteDifference;
        if (endMinutes === 60) {
            endHours += 1;
            endMinutes = 0;
        }
        if (endHours > 23) {
            endHours = 23;
            endMinutes = 30;
        }
        return dateFns.setHours(this.startDate, endHours).setMinutes(endMinutes);
    }

    setTimeDifference(endTime) {
        const hourDifference = endTime.getHours() - this.state.time.start.getHours();
        const minuteDifference = +(endTime.getMinutes() - this.state.time.start.getMinutes());
        this.setState({
            hourDifference,
            minuteDifference,
            time: {
                ...this.state.time,
                end: this.getEndTime()
            }
        });
    }

    async enableTime() {
        this.setState({
            time: {
                start: dateFns.setHours(this.startDate, 8),
                end: dateFns.setHours(this.startDate, 9),
            },
            timePickerEnabled: true
        })
    }

    setStartTime(start) {
        this.setState({
            time: {
                ...this.state.time,
                start
            }
        })
    }

    saveEvent() {
        const {title, description, date, time, type} = this.state;
        let data = {
            title,
            description,
            date,
            time,
            type
        };
        this.props.closeCreatingFrom();
        EntitieService.create(this.props.user._id, data)
            .then(resp => {
                const date = dateFns.format(resp.date, 'M/D/YY');
                this.props.pushEntities(date, resp);
            })
            .catch(err => console.log(err));
    }

    setDate(date) {
        this.props.openCreatingForm(dateFns.format(date, 'M/D/YY'));
        this.setState({date})
    }

    eventForm() {
        return (
            <div className="event-details-container">
                <div className="time-pick-container">
                    <i className="far fa-clock" />
                    <DatePicker
                        selected={this.state.date}
                        onChange={ date => this.setDate(date)}
                        dateFormat="d MMM yyyy"
                    />
                    {this.state.timePickerEnabled ? (
                        <div className="time-picker">
                            <DatePicker
                                selected={this.state.time.start}
                                onChange={(startTime) => this.setStartTime(startTime)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                dateFormat="h:mmaa"
                            />
                            <p className='slash'>–</p>
                            <DatePicker
                                selected={this.getEndTime()}
                                onChange={(endTime) => this.setTimeDifference(endTime)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                dateFormat="h:mmaa"
                                minTime={this.state.time.start}
                                maxTime={this.maxTime}
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => this.enableTime()}
                            className='time-picker-enabler'
                        >Add time</button>
                    )}
                </div>
                <div className="description-container">
                    <i className="fas fa-align-left" />
                    <input
                        type="text"
                        placeholder="Add description"
                        value={this.state.description}
                        onChange={e => this.setState({description: e.target.value})}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='creating-form'>
                <i onClick={() => this.props.closeCreatingFrom()} className="fas fa-times close-button" />
                <input
                    className='name-input'
                    type="text"
                    placeholder={this.state.type === 'event' ? 'Add name and time' : 'Add a name'}
                    value={this.state.title}
                    onChange={e => this.setState({title: e.target.value})}
                />
                <div className='event-types-container'>
                    {eventTypes.map(type => (
                        <p
                            onClick={() => this.setState({type: type})}
                            className={`event-type ${this.state.type === type ? 'active' : ''}`}
                            key={type}
                        >{type}</p>
                    ))}
                </div>
                {this.eventForm()}
                <div className="button-container">
                    <button onClick={() => this.saveEvent()}>Save</button>
                </div>
            </div>
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
        openCreatingForm,
        closeCreatingFrom,
        pushEntities
    })
)(CreatingForm);
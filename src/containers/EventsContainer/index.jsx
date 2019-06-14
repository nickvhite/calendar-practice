import React, {Component} from 'react';
import {connect} from 'react-redux';
import dateFns from "date-fns";

class EventsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                time: [],
                noTime: []
            },
            reminder: [],
            task: []
        };
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.entities[this.props.date] !== this.props.entities[this.props.date]) {
            this.sortEntities();
        }
    }

    sortEventsByTime(events) {
        const sort = {
            time: [],
            noTime: []
        };
        events.map(event => {
            event.time ? sort.time.push(event) : sort.noTime.push(event);
        });
        return sort;

    }

    sortEntities() {
        if (this.props.entities[this.props.date]) {
            const newState = {
                event: [],
                reminder: [],
                task: [],
                sortedEvents: {}
            };
            this.props.entities[this.props.date].map(entity => newState[entity.type].push(entity));
            newState.sortedEvents= this.sortEventsByTime(newState.event);
            this.setState({
                event: newState.sortedEvents,
                reminder: newState.reminder,
                task: newState.task
            })
        }

    }

    render() {
        return (
            <div className="event-container">
                {this.props.eventForm.creatingForm === this.props.date ? (
                    <p id="event-creator" className='event-creator'>No title</p>
                ) : null}
                {this.state.event.noTime.length ? (
                    this.state.event.noTime.map(event => (
                        <p key={event._id} className='no-time-event'>{event.title || 'No title'}</p>
                    ))
                ): null}
                {this.state.reminder.length ? (
                    this.state.reminder.map(remind => (
                        <p key={remind._id} className='reminder'>
                            <i className="fas fa-check"/>
                            <span className='title'>{remind.title || 'No title'}</span>
                        </p>
                    ))
                ): null}
                {this.state.task.length ? (
                    <p className='task'>
                        <i className="fas fa-hand-point-up"/>
                        <span className='title'>{`${this.state.task.length} tasks`}</span>
                    </p>
                ) : null}
                {this.state.event.time.length ? (
                    this.state.event.time.map(event => (
                        <p key={event._id} className="time-event">
                            <i className="fas fa-circle" />
                            <span>{dateFns.format(event.time.start, 'H:mmA')}</span>
                            <span className='title'>{event.title || 'No title'}</span>
                        </p>
                    ))
                ): null}
            </div>
        )
    }
}

export default connect(
    state => ({
        entities: state.entities,
        eventForm: state.eventForm
    }),
    ({
    })
)(EventsContainer)
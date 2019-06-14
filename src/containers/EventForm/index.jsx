import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeCreatingFrom, openCreatingForm} from "../../store/eventForm";

import CreatingForm from '../CreatingForm';

class EventForm extends Component {
    constructor(props) {
        super(props);
    }

    getPosition() {
        let position = {};
        const dayBlock = document.querySelector(`[data-date="${this.props.eventForm.creatingForm || this.props.eventForm.infoForm}"]`);
        const container = document.querySelector('.calendar-month-container');
        const containerHeight = container.offsetHeight;
        const dayBlockLeft = dayBlock.offsetLeft;
        const dayBlockTop = dayBlock.parentNode.offsetTop;
        const dayBlockWidth = dayBlock.offsetWidth;
        const dayBlockHeight = dayBlock.offsetHeight;
        position.left = dayBlockLeft - 460 >= 0 ? dayBlockLeft - 460 : dayBlockLeft + dayBlockWidth + 10;
        if (dayBlockTop + dayBlockHeight <= containerHeight - 272 ) {
            position.top = dayBlockTop + 106;
        } else {
            position.bottom = 40;
        }
        return position;
    }

    render() {
        const {eventForm} = this.props;
        return(
            <div
                className="event-form"
                style={this.getPosition()}
            >
                {eventForm.creatingForm ? (
                    <CreatingForm
                        date={this.props.date}
                    />
                ) : null}
                {eventForm.infoForm? (
                    <div className="event-form">
                        <h1>Event form</h1>
                    </div>
                ) : null}
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
        closeCreatingFrom
    })
)(EventForm);


import React from 'react';

import EventsContainer from '../../containers/EventsContainer';

const CalendarDay = ({additionalClass, formattedDate, dayNumber}) => {
    return (
        <div
            data-date={formattedDate}
            className={`day-container ${additionalClass}`}
        >
            <div className="day-number">
                <span>{dayNumber}</span>
            </div>
            <EventsContainer
                date={formattedDate}
            />
        </div>
    )
};

export default CalendarDay;
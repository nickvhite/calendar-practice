import React, {Component} from 'react';

const CalendarWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="week-days-container">
            {days.map(day => <p key={day}>{day}</p>)}
        </div>
    )
};

export default CalendarWeek;